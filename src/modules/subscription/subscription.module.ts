import { Module } from '@nestjs/common';
import { stripeProvider } from '../../core/utils/stripe/stripe.provider';
import { AuthServicesModule } from '../../services/auth-services.module';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
    imports: [
        AuthServicesModule,
    ],
    providers: [
        stripeProvider,
        SubscriptionService,
    ],
    controllers: [
        SubscriptionController,
    ],
})
export class SubscriptionModule { }
