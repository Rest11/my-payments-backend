import { Inject, Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';
import ICharge = Stripe.charges.ICharge;
import IChargeCreationOptions = Stripe.charges.IChargeCreationOptions;
import { Injectables } from '../../core/constants';
import { Database } from '../../database/database';
import { DonationResponse } from './types/donation.response';
import { DonationType } from '../../database/models/donation/donation.type';

@Injectable()
export class PaymentService {
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
}
