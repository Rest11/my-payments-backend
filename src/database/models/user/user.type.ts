import { DatabaseContract } from '../../../core/contracts/database.contract';

export interface UserType {
    [DatabaseContract.Users.PROPERTY_EXTERNAL_ID]: string;
    [DatabaseContract.Users.PROPERTY_EMAIL]: string;
    [DatabaseContract.Users.PROPERTY_NAME]: string;
    [DatabaseContract.Users.PROPERTY_AVATAR]: string;
}
