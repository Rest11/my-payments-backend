import { BadRequestException, Body, Controller, Get, Headers, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Rest } from '../../core/contracts/rest.contract';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SubscriptionService } from './subscription.service';
import { SubscriptionPlansResponse } from './types/subscription-plans.response';
import { ParseQueryPipe } from '../../core/pipes/parse-query.pipe';
import { RequestHeaderParams } from '../../core/constants';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { UserData } from '../../core/types/user-data';
import { AuthService } from '../../services/auth.service';
import { SubscriptionDto } from './types/subscription.dto';
import { SUBSCRIPTION_DTO } from './schemas/subscription.dto.schema';
import { SubscriptionData } from './types/subscription-data';
import { CurrentSubscription } from './types/current-subscription';

@Controller(Rest.Subscription.BASE)
export class SubscriptionController {
    constructor (
        private readonly authService: AuthService,
        private readonly subscriptionService: SubscriptionService,
    ) {}

    @Get('')
    @UseGuards(AuthGuard)
    public subscriptionPlans (): Promise<SubscriptionPlansResponse[]> {
        return this.subscriptionService.getSubscriptionPlansStripe();
    }

    @Post('')
    @UseGuards(AuthGuard)
    @UsePipes(ParseQueryPipe)
    public async newSubscription (
        @Headers(RequestHeaderParams.AUTHORIZATION) userToken: string,
        @Headers(RequestHeaderParams.AUTH_PLATFORM) authPlatform: string,
        @Body(new ValidationPipe(SUBSCRIPTION_DTO)) dto: SubscriptionDto,
    ): Promise<CurrentSubscription> {
        try {
            const userData: UserData = await this.authService.checkUserToken(userToken, authPlatform);
            const subscriptionData: SubscriptionData = {
                ...dto,
                customerEmail: userData.email,
            };

            return this.subscriptionService.createSubscriptionStripe(subscriptionData);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Get(Rest.Subscription.CURRENT)
    @UseGuards(AuthGuard)
    public async currentSubscription (
        @Headers(RequestHeaderParams.AUTHORIZATION) userToken: string,
        @Headers(RequestHeaderParams.AUTH_PLATFORM) authPlatform: string,
    ): Promise<CurrentSubscription | null> {
        try {
            const userData: UserData = await this.authService.checkUserToken(userToken, authPlatform);
            return this.subscriptionService.getCurrentSubscriptionStripe(userData.email);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Get(`${Rest.Subscription.CANCEL}/:${Rest.Subscription.PARAM_SUBSCRIPTION_ID}`)
    @UseGuards(AuthGuard)
    public async cancelSubscription (
        @Headers(RequestHeaderParams.AUTHORIZATION) userToken: string,
        @Headers(RequestHeaderParams.AUTH_PLATFORM) authPlatform: string,
        @Param(Rest.Subscription.PARAM_SUBSCRIPTION_ID) subscriptionID: string,
    ): Promise<void> {
        try {
            const userData: UserData = await this.authService.checkUserToken(userToken, authPlatform);

            await this.subscriptionService.cancelSubscriptionStripe(userData.email, subscriptionID);

            return;
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
