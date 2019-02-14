export namespace Rest {
    export const API = 'api';

    export namespace Auth {
        export const BASE = 'authenticate';

        export const GET_TOKEN = 'get-token';
    }

    export namespace User {
        export const BASE = 'user';
    }

    export namespace Payment {
        export const BASE = 'payment';

        export const DONATION = 'donation';
        export const USERS_AMOUNT = 'users-amount';
        export const PAYMENTS_AMOUNT = 'payments-amount';
        export const PAYMENTS_SUM = 'payments-sum';
    }

    export namespace Transactions {
        export const BASE = 'transactions';
    }
}
