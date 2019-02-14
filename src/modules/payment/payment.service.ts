import { Inject, Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';
import ICharge = Stripe.charges.ICharge;
import IChargeCreationOptions = Stripe.charges.IChargeCreationOptions;
import { FindOptions, fn } from 'sequelize';
// tslint:disable-next-line:no-duplicate-imports
import * as sequelize from 'sequelize';
import { Injectables } from '../../core/constants';
import { Database } from '../../database/database';
import { DonationResponse } from './types/donation.response';
import { DonationType } from '../../database/models/donation/donation.type';
import { DonationInstance } from '../../database/models/donation/donation.instance';
import { DatabaseContract } from '../../core/contracts/database.contract';

@Injectable()
export class PaymentService {
    private readonly dateFormatField: string = 'date';
    private readonly dataFormatted: [fn, string] = [
        sequelize.fn('date_format', sequelize.col(DatabaseContract.Donations.COLUMN_CREATED_AT), '%Y-%m-%d'),
        this.dateFormatField,
    ];

    constructor (
        @Inject(Injectables.STRIPE)
        private readonly stripe: Stripe,
        @Inject(Injectables.DATABASE)
        private readonly database: Database,
    ) {}

    public async makeDonation (paymentDto: IChargeCreationOptions): Promise<DonationResponse> {
        try {
            const stripeResponse: ICharge = await this.stripe.charges.create(paymentDto);
            return {
                transactionId: stripeResponse.id,
                status: true,
            };
        } catch (err) {
            return {
                status: false,
                errorMessage: err.message,
            };
        }
    }

    public async refundDonation (chargeId: string): Promise<void> {
        await this.stripe.charges.refund(chargeId);
    }

    public async saveDonation (dto: DonationType): Promise<void> {
        await this.database.donationModel.create(dto);
    }

    public async getUsersAmount (): Promise<DonationInstance[]> {
        const dateFormatField: string = 'date';
        const usersCountField: string = 'usersCount';
        const options: FindOptions<DonationInstance> = {
            where: {
                [DatabaseContract.Donations.PROPERTY_STATUS]: true,
            },
            attributes: [
                [
                    sequelize.fn('date_format', sequelize.col(DatabaseContract.Donations.COLUMN_CREATED_AT), '%Y-%m-%d'),
                    dateFormatField,
                ],
                [
                    sequelize.fn(
                        'count',
                        sequelize.fn('distinct', sequelize.col(DatabaseContract.Donations.COLUMN_FK_USER_EXTERNAL_ID)),
                        sequelize.col(DatabaseContract.Donations.COLUMN_FK_USER_EXTERNAL_ID),
                    ),
                    usersCountField,
                ],
            ],
            group: [
                dateFormatField,
            ],
        };

        return this.database.donationModel.findAll(options);
    }

    public async getPaymentsAmount (): Promise<DonationInstance[]> {
        const paymentsAmountField: string = 'paymentsAmount';
        const options: FindOptions<DonationInstance> = {
            where: {
                [DatabaseContract.Donations.PROPERTY_STATUS]: true,
            },
            attributes: [
                this.dataFormatted,
                [
                    sequelize.fn('count', sequelize.col(DatabaseContract.Donations.COLUMN_TRANSACTION_ID)),
                    paymentsAmountField,
                ],
            ],
            group: [
                this.dateFormatField,
            ],
        };

        return this.database.donationModel.findAll(options);
    }

    public async getPaymentsSum (): Promise<DonationInstance[]> {
        const paymentsSumField: string = 'paymentsSum';
        const options: FindOptions<DonationInstance> = {
            where: {
                [DatabaseContract.Donations.PROPERTY_STATUS]: true,
            },
            attributes: [
                this.dataFormatted,
                [
                    sequelize.fn('sum', sequelize.col(DatabaseContract.Donations.COLUMN_AMOUNT)),
                    paymentsSumField,
                ],
            ],
            group: [
                this.dateFormatField,
            ],
        };

        return this.database.donationModel.findAll(options);
    }
}
