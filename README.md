# My Payments - Backend
This is the server-side of the project "My Payments".

#### Deployment order:
1. Clone this project;
2. Create file `config.ts` from `config/config.sample.ts` in the same folder;
3. Before configuration `config.ts` file you have to create developer accounts at [Google](https://console.developers.google.com), [Facebook](https://developers.facebook.com/apps) and [Stripe](https://dashboard.stripe.com/account/apikeys) for using Google, Facebook authentication and making payments by Stripe;
4. Configure `config.ts` like in the sample `config/config.sample.ts`;
5. Create a schema of the database (in MySQL) that should be called like in the filed `config.database.schema`;
6. Run `npm install` to install all libraries;
7. Start project `npm start` or `npm run watch` to checking changes.

#### Technology stack:
1. Node.js + NestJS (TypeScript);
2. MySQL;
3. Sequelize;
4. Google OAuth (server-side);
5. Facebook OAuth (server-side);
6. Stripe (server-side);
7. jsonwebtoken;
8. Nodemon.
