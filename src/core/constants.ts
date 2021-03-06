export enum Injectables {
    DATABASE = 'Database',
    STRIPE = 'Stripe',
    GOOGLE_AUTH = 'Google auth',
}

export enum RequestHeaderParams {
    AUTHORIZATION = 'authorization',
    AUTH_PLATFORM = 'auth-platform',
}

export enum PaymentConfiguration {
    CURRENCY = 'usd',
}

export enum DbReferentialActions {
    CASCADE = 'CASCADE',
    SET_NULL = 'SET NULL',
    RESTRICT = 'RESTRICT',
    NO_ACTION = 'NO ACTION',
    SET_DEFAULT = 'SET DEFAULT',
}

export enum StatusCodeServerResponse {
    BAD_REQUEST = 400,
}

export enum SortOrders {
    ASC = 'asc',
    DESC = 'desc',
    RANDOM = 'random',
}

export enum DefaultCommonValues {
    LIMIT = 10,
    OFFSET = 0,
}

export enum AuthPlatform {
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
}
