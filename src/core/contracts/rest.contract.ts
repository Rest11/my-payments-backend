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
        export const STATISTIC = 'statistic';
    }

    export namespace Transactions {
        export const BASE = 'transactions';
    }

    export namespace Subscription {
        export const BASE = 'subscription';

        export const CURRENT = 'current';
        export const CANCEL = 'cancel';
        export const PARAM_SUBSCRIPTION_ID = 'subscriptionID';
    }
}
