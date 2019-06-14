import { SubscriptionDto } from './subscription.dto';

export interface SubscriptionData extends SubscriptionDto {
    customerEmail: string;
}
