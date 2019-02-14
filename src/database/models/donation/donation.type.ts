import { DatabaseContract } from '../../../core/contracts/database.contract';

export interface DonationType {
    [DatabaseContract.Donations.PROPERTY_USER_EXTERNAL_ID]: string;
    [DatabaseContract.Donations.PROPERTY_TRANSACTION_ID]?: string;
    [DatabaseContract.Donations.PROPERTY_CURRENCY]: string;
    [DatabaseContract.Donations.PROPERTY_AMOUNT]: number;
    [DatabaseContract.Donations.PROPERTY_DESCRIPTION]: string;
    [DatabaseContract.Donations.PROPERTY_STATUS]: boolean;
    [DatabaseContract.Donations.PROPERTY_ERROR_MESSAGE]?: string;
}
