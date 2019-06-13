import { BadRequestException, Controller, Get, Headers, Query, UseGuards, UsePipes } from '@nestjs/common';
import { Rest } from '../../core/contracts/rest.contract';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RequestHeaderParams } from '../../core/constants';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { CollectionQueryDto } from '../../core/types/collection-query.dto';
import { COLLECTION_QUERY_SCHEMA } from '../../core/schemas/collection-query.schema';
import { TransactionsDto } from './types/transactions.dto';
import { GetTransactions } from './types/get-transactions';
import { CollectionResponse } from '../../core/types/collection-response';
import { DonationInstance } from '../../database/models/donation/donation.instance';
import { ParseQueryPipe } from '../../core/pipes/parse-query.pipe';
import { UserData } from '../../core/types/user-data';

@Controller(Rest.Transactions.BASE)
export class TransactionController {
    constructor (
        private readonly authService: AuthService,
        private readonly transactionService: TransactionService,
    ) {}

    @Get()
    @UsePipes(ParseQueryPipe)
    @UseGuards(AuthGuard)
    public async transactions (
        @Headers(RequestHeaderParams.AUTHORIZATION) userToken: string,
        @Headers(RequestHeaderParams.AUTH_PLATFORM) authPlatform: string,
        @Query(new ValidationPipe(COLLECTION_QUERY_SCHEMA)) dto: CollectionQueryDto,
    ): Promise<CollectionResponse<DonationInstance>> {
        try {
            const userData: UserData | null = await this.authService.checkUserToken(userToken, authPlatform);

            const params: TransactionsDto = {
                userId: userData.id,
                ...dto,
            };
            const data: GetTransactions = await this.transactionService.getTransactions(params);

            return {
                items: data.rows,
                total: data.count,
            };
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
