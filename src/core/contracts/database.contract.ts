export namespace DatabaseContract {
    export abstract class Base {
        public static readonly COLUMN_ID = 'id';
        public static readonly COLUMN_CREATED_AT = 'created_at';
        public static readonly COLUMN_UPDATED_AT = 'updated_at';
    }

    export abstract class Users extends Base {
        public static readonly TABLE_NAME = 'user';

        public static readonly COLUMN_EMAIL = 'email';
        public static readonly COLUMN_NAME = 'name';

        public static readonly INDEX_EMAIL = 'email_idx';
    }
}
