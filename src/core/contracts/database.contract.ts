export namespace DatabaseContract {
    export abstract class Base {
        public static readonly COLUMN_ID = 'id';
        public static readonly PROPERTY_ID = 'id';
        public static readonly COLUMN_CREATED_AT = 'created_at';
        public static readonly PROPERTY_CREATED_AT = 'createdAt';
        public static readonly COLUMN_UPDATED_AT = 'updated_at';
        public static readonly PROPERTY_UPDATED_AT = 'updatedAt';
    }

    export abstract class Users extends Base {
        public static readonly TABLE_NAME = 'user';
        public static readonly ALIAS = 'userData';

        public static readonly COLUMN_EXTERNAL_ID = 'external_id';
        public static readonly PROPERTY_EXTERNAL_ID = 'externalId';
        public static readonly COLUMN_EMAIL = 'email';
        public static readonly PROPERTY_EMAIL = 'email';
        public static readonly COLUMN_NAME = 'name';
        public static readonly PROPERTY_NAME = 'name';
        public static readonly COLUMN_AVATAR = 'avatar';
        public static readonly PROPERTY_AVATAR = 'avatar';
    }

    export abstract class Donations extends Base {
        public static readonly TABLE_NAME = 'donation';

        public static readonly COLUMN_FK_USER_EXTERNAL_ID = 'user_external_id';
        public static readonly PROPERTY_USER_EXTERNAL_ID = 'userExternalId';
        public static readonly COLUMN_TRANSACTION_ID = 'transaction_id';
        public static readonly PROPERTY_TRANSACTION_ID = 'transactionId';
        public static readonly COLUMN_CURRENCY = 'currency';
        public static readonly PROPERTY_CURRENCY = 'currency';
        public static readonly COLUMN_AMOUNT = 'amount';
        public static readonly PROPERTY_AMOUNT = 'amount';
        public static readonly COLUMN_DESCRIPTION = 'description';
        public static readonly PROPERTY_DESCRIPTION = 'description';
        public static readonly COLUMN_STATUS = 'status';
        public static readonly PROPERTY_STATUS = 'status';
        public static readonly COLUMN_ERROR_MESSAGE = 'error_message';
        public static readonly PROPERTY_ERROR_MESSAGE = 'errorMessage';
    }
}
