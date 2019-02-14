import { Inject, Injectable } from '@nestjs/common';
import { DefaultCommonValues, Injectables, SortOrders } from '../../core/constants';
import { FindOptions } from 'sequelize';
import { Database } from '../../database/database';
import { GetTransactions } from './types/get-transactions';
import { DatabaseContract } from '../../core/contracts/database.contract';
import { TransactionsDto } from './types/transactions.dto';
import { DonationInstance } from '../../database/models/donation/donation.instance';

@Injectable()
export class TransactionService {
    constructor (
        @Inject(Injectables.DATABASE)
        private readonly database: Database,
    ) {}

    public async getTransactions (dto: TransactionsDto): Promise<GetTransactions> {
        const options: FindOptions<DonationInstance> = {
            where: {
                [DatabaseContract.Donations.PROPERTY_USER_EXTERNAL_ID]: dto.userId,
            },
            attributes: [
                DatabaseContract.Donations.PROPERTY_CREATED_AT,
                DatabaseContract.Donations.PROPERTY_TRANSACTION_ID,
                DatabaseContract.Donations.PROPERTY_CURRENCY,
                DatabaseContract.Donations.PROPERTY_AMOUNT,
                DatabaseContract.Donations.PROPERTY_DESCRIPTION,
                DatabaseContract.Donations.PROPERTY_STATUS,
                DatabaseContract.Donations.PROPERTY_ERROR_MESSAGE,
            ],
            limit: dto.limit || DefaultCommonValues.LIMIT,
            offset: dto.offset || DefaultCommonValues.OFFSET,
            order: [[
                dto.sortField || DatabaseContract.Donations.COLUMN_CREATED_AT,
                dto.sortOrder || SortOrders.DESC,
            ]],
        };

        return this.database.donationModel.findAndCountAll(options);
    }
}
