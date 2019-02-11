import { CustomFactory } from '@nestjs/core/injector/module';
import * as Stripe from 'stripe';
import { Injectables } from "../../constants";
import { config } from '../../../../config/config';

export const stripeProvider: CustomFactory = {
    name: Injectables.STRIPE,
    provide: Injectables.STRIPE,
    useFactory: () => new Stripe(config.paymentCredentials.stripe.secretKey),
};
