import { Module } from '@nestjs/common';
import { databaseProvider } from '../../database/database.provider';
import { AuthService } from '../../services/auth.service';
import { DonationController } from './donation.controller';
import { PaymentService } from './payment.service';
import { stripeProvider } from '../../core/utils/stripe/stripe.provider';
import { googleAuthProvider } from '../../core/utils/google-auth/google-auth.provider';

@Module({
    providers: [
        databaseProvider,
        stripeProvider,
        googleAuthProvider, // this provider for AuthService
        AuthService,
        PaymentService,
    ],
    controllers: [
        DonationController,
    ],
})
export class PaymentModule { }
