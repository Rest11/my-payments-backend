import { BadRequestException, Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import * as Stripe from 'stripe';
import IChargeCreationOptions = Stripe.charges.IChargeCreationOptions;
import { Rest } from '../../core/contracts/rest.contract';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { PaymentConfiguration, RequestParams, StatusCodeServerResponse } from '../../core/constants';
import { DONATION } from './schemas/donation.schema';
import { DonationDto } from './types/donation.dto';
import { PaymentService } from './payment.service';
import { DonationResponse } from './types/donation.response';
import { DonationType } from '../../database/models/donation/donation.type';
import { DatabaseContract } from '../../core/contracts/database.contract';
import { DonationInstance } from '../../database/models/donation/donation.instance';

@Controller(Rest.Payment.BASE)
export class DonationController {
    constructor (
        private readonly authService: AuthService,
        private readonly paymentService: PaymentService,
    ) {}

    @Post(Rest.Payment.DONATION)
    @UseGuards(AuthGuard)
    public async donation (
        @Headers(RequestParams.AUTHORIZATION) token: string,
        @Body(new ValidationPipe(DONATION)) dto: DonationDto,
    ): Promise<DonationResponse> {
        const donationContract: typeof DatabaseContract.Donations = DatabaseContract.Donations;
        const userData: TokenPayload | null = await this.authService.checkUserToken(token);
        const donationDto: IChargeCreationOptions = {
            amount: dto.amountPayment * 100, // conversion into cents
            currency: PaymentConfiguration.CURRENCY,
            description: dto.description,
            source: dto.stripeTokenId,
        };
        const donationDtoDB: DonationType = {
            [donationContract.PROPERTY_USER_EXTERNAL_ID]: userData.sub,
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

            // it is necessary to refund payment if payment was successful but you got an error with DB
            if (paymentResult.transactionId) await this.paymentService.refundDonation(paymentResult.transactionId);

            // error handler of other errors
            throw new BadRequestException('Something went wrong. Please try later.');
        }
    }

    @Get(Rest.Payment.USERS_AMOUNT)
    @UseGuards(AuthGuard)
    public async usersAmount (): Promise<DonationInstance[]> {
        return this.paymentService.getUsersAmount();
    }

    @Get(Rest.Payment.PAYMENTS_AMOUNT)
    @UseGuards(AuthGuard)
    public async paymentsAmount (): Promise<DonationInstance[]> {
        return this.paymentService.getPaymentsAmount();
    }

    @Get(Rest.Payment.PAYMENTS_SUM)
    @UseGuards(AuthGuard)
    public async paymentsSum (): Promise<DonationInstance[]> {
        return this.paymentService.getPaymentsSum();
    }
}
