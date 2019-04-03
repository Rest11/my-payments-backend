import { Module } from '@nestjs/common';
import { databaseProvider } from '../../database/database.provider';
import { DonationController } from './donation.controller';
import { PaymentService } from './payment.service';
import { stripeProvider } from '../../core/utils/stripe/stripe.provider';
import { AuthServicesModule } from '../../services/auth-services.module';

@Module({
    imports: [
        AuthServicesModule,
    ],
    providers: [
        databaseProvider,
        stripeProvider,
        PaymentService,
    ],
    controllers: [
        DonationController,
    ],
})
export class PaymentModule { }
