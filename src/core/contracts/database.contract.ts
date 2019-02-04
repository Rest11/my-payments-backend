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

        public static readonly COLUMN_EXTERNAL_ID = 'external_id';
        public static readonly PROPERTY_EXTERNAL_ID = 'externalId';
        public static readonly COLUMN_EMAIL = 'email';
        public static readonly PROPERTY_EMAIL = 'email';
        public static readonly COLUMN_NAME = 'name';
        public static readonly PROPERTY_NAME = 'name';
        public static readonly COLUMN_AVATAR = 'avatar';
        public static readonly PROPERTY_AVATAR = 'avatar';
    }
}
