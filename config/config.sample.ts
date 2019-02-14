export const config = {
    server: {                                               // server configuration
        port: 3000,                                             // port to deploy on and listen to
        apiVersion: '1.0',                                      // API version; influences global routes prefix
    },
    database: {                                             // database configuration
        userName: 'admin',                                      // DB server user name
        password: 'admin',                                      // DB server password
        schema: 'my-payments',                               // schema to use (created manually)
        host: '127.0.0.1',                                      // DB server host
        dialect: 'mysql',                                       // dialect (should be 'mysql' - not tested on another ones)
        idle: 60 * 1000,                                        // the maximum time, in milliseconds, that a connection can be idle before being released
        maxPoolConnection: 10,                                  // maximum number of connection in pool
    },
    auth: {                                                 // authentication configuration
        secretTokenKey: '1234567890',                       // key to encoding/decoding by jsonwebtoken
        google: {                                           // google credentials of authentication (https://console.developers.google.com)
            clientID: '***.apps.googleusercontent.com',         // client id of the app from the google account for developers
            providerID: '123456790',                            // provider id of the app from the google account for developers
        },
    },
    paymentCredentials: {                                   // credentials of payment services
        stripe: {                                           // stripe credentials (https://dashboard.stripe.com/account/apikeys)
            secretKey: 'sk_test_123456',                    // secret API key of your account
        },
    },
};
