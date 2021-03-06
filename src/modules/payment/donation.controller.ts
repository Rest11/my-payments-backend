import { BadRequestException, Body, Controller, Get, Headers, Post, UseGuards, UsePipes } from '@nestjs/common';
import { charges } from 'stripe';
import IChargeCreationOptions = charges.IChargeCreationOptions;
import { Rest } from '../../core/contracts/rest.contract';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { PaymentConfiguration, RequestHeaderParams, StatusCodeServerResponse } from '../../core/constants';
import { DONATION } from './schemas/donation.schema';
import { DonationDto } from './types/donation.dto';
import { DonationService } from './donation.service';
import { DonationResponse } from './types/donation.response';
import { DonationType } from '../../database/models/donation/donation.type';
import { DatabaseContract } from '../../core/contracts/database.contract';
import { ParseQueryPipe } from '../../core/pipes/parse-query.pipe';
import { UserData } from '../../core/types/user-data';
import { PaymentStatistic } from './types/payment-statistic';

@Controller(Rest.Payment.BASE)
export class DonationController {
    constructor (
        private readonly authService: AuthService,
        private readonly paymentService: DonationService,
    ) {}

    @Post(Rest.Payment.DONATION)
    @UsePipes(ParseQueryPipe)
    @UseGuards(AuthGuard)
    public async donation (
        @Headers(RequestHeaderParams.AUTHORIZATION) userToken: string,
        @Headers(RequestHeaderParams.AUTH_PLATFORM) authPlatform: string,
        @Body(new ValidationPipe(DONATION)) dto: DonationDto,
    ): Promise<DonationResponse> {
        const donationContract: typeof DatabaseContract.Donations = DatabaseContract.Donations;

        const userData: UserData | null = await this.authService.checkUserToken(userToken, authPlatform);
        const donationDto: IChargeCreationOptions = {
            amount: dto.amountPayment * 100, // conversion into cents
            currency: PaymentConfiguration.CURRENCY,
            description: dto.description,
            source: dto.stripeTokenId,
        };
        const donationDtoDB: DonationType = {
            [donationContract.PROPERTY_USER_EXTERNAL_ID]: userData.id,
            [donationContract.PROPERTY_CURRENCY]: PaymentConfiguration.CURRENCY,
            [donationContract.PROPERTY_AMOUNT]: dto.amountPayment,
            [donationContract.PROPERTY_DESCRIPTION]: dto.description,
            [donationContract.PROPERTY_STATUS]: false,
        };

        const paymentResult: DonationResponse = await this.paymentService.makeDonation(donationDto);
        donationDtoDB[donationContract.PROPERTY_TRANSACTION_ID] = paymentResult.transactionId;
        donationDtoDB[donationContract.PROPERTY_STATUS] = paymentResult.status;
        donationDtoDB[donationContract.PROPERTY_ERROR_MESSAGE] = paymentResult.errorMessage;

        try {
            if (!paymentResult.status) {
                await this.paymentService.saveDonation(donationDtoDB);
                throw new BadRequestException(paymentResult.errorMessage);
            }

            await this.paymentService.saveDonation(donationDtoDB);

            return {
                status: paymentResult.status,
            };
        } catch (err) {
            // error handler of payments
            if (err.status === StatusCodeServerResponse.BAD_REQUEST) throw new BadRequestException(err.message.message);

            // it is necessary to refund payment if payment was successful but you got an error in DB
            if (paymentResult.transactionId) await this.paymentService.refundDonation(paymentResult.transactionId);

            // error handler of other errors
            throw new BadRequestException('Something went wrong. Please try later');
        }
    }

    @Get(Rest.Payment.STATISTIC)
    @UseGuards(AuthGuard)
    public async paymentsStatistic (): Promise<PaymentStatistic> {
        const [ sum, amount, usersAmount ]  = await Promise.all([
            this.paymentService.getPaymentsSum(),
            this.paymentService.getPaymentsAmount(),
            this.paymentService.getUsersAmount(),
        ]);

        return {
            sum,
            amount,
            usersAmount,
        };
    }
}
