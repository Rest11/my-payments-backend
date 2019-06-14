import { Inject, Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';
import IList = Stripe.IList;
import IPlan = Stripe.plans.IPlan;
import customers = Stripe.customers;
import subscriptions = Stripe.subscriptions;
import cards = Stripe.cards;
import bankAccounts = Stripe.bankAccounts;
import { Injectables } from '../../core/constants';
import { SubscriptionPlansResponse } from './types/subscription-plans.response';
import { SubscriptionData } from './types/subscription-data';
import { CurrentSubscription } from './types/current-subscription';

@Injectable()
export class SubscriptionService {
    constructor (
        @Inject(Injectables.STRIPE)
        private readonly stripe: Stripe,
    ) {}

    private async getCustomerStripe (customerEmail: string): Promise<customers.ICustomer | null> {
        const customer: IList<customers.ICustomer> = await this.stripe.customers.list({ email: customerEmail });
        if (!customer.data.length) return null;

        return customer.data[0];
    }

    public async getSubscriptionPlansStripe (): Promise<SubscriptionPlansResponse[]> {
        const plans: IList<IPlan> = await this.stripe.plans.list();

        return plans.data
            .filter((plan: IPlan) => plan.active)
            .map((plan: IPlan) => {
                return {
                    id: plan.id,
                    name: plan.nickname,
                    price: plan.amount / 100, // conversion to dollar
                    currency: plan.currency,
                    interval: plan.interval,
                };
            });
    }

    public async createSubscriptionStripe (subscriptionData: SubscriptionData): Promise<CurrentSubscription> {
        let customerData: customers.ICustomer | null = await this.getCustomerStripe(subscriptionData.customerEmail);

        if (!customerData) customerData = await this.stripe.customers.create({ email: subscriptionData.customerEmail });

        const customerID: string = customerData.id;

        // adding a card to the customer
        const cardSource: cards.ICard | bankAccounts.IBankAccount = await this.stripe.customers.createSource(
            customerID,
            {
                source: subscriptionData.paymentToken,
            },
        );
        // set default card
        await this.stripe.customers.update(customerID, { default_source: cardSource.id });

        const subscriptionDto: subscriptions.ISubscriptionCustCreationOptions = {
            plan: subscriptionData.subscriptionPlanId,
        };
        const subscription: subscriptions.ISubscription = await this.stripe.customers.createSubscription(customerID, subscriptionDto);

        return {
            status: subscription.status,
            id: subscription.plan.id,
            name: subscription.plan.nickname,
            price: subscription.plan.amount / 100, // conversion to dollar
            currency: subscription.plan.currency,
            interval: subscription.plan.interval,
            subscriptionID: subscription.id,
        };
    }

    public async getCurrentSubscriptionStripe (customerEmail: string): Promise<CurrentSubscription | null> {
        const customerDataList: IList<customers.ICustomer> = await this.stripe.customers.list({ email: customerEmail });

        if (!customerDataList.data.length) return null;

        const customerID: string = customerDataList.data[0].id;
        const subscriptionsList: IList<subscriptions.ISubscription> =  await this.stripe.customers.listSubscriptions(customerID);

        if (!subscriptionsList.data.length) return null;

        return {
            status: subscriptionsList.data[0].status,
            id: subscriptionsList.data[0].plan.id,
            name: subscriptionsList.data[0].plan.nickname,
            price: subscriptionsList.data[0].plan.amount / 100, // conversion to dollar
            currency: subscriptionsList.data[0].plan.currency,
            interval: subscriptionsList.data[0].plan.interval,
            subscriptionID: subscriptionsList.data[0].id,
        };
    }

    public async cancelSubscriptionStripe (customerEmail: string, subscriptionID: string): Promise<void> {
        const customerData: customers.ICustomer | null = await this.getCustomerStripe(customerEmail);

        if (!customerData) throw new Error('Customer not found');

        await this.stripe.customers.cancelSubscription(customerData.id, subscriptionID);
    }
}
