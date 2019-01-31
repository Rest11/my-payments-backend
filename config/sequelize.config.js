require('ts-node/register');

const { config } = require('./config');


// TODO: do we use it?
module.exports = {
    development: {
        username: config.database.userName,
        password: config.database.password,
        database: config.database.schema,
        host: config.database.host,
        dialect: config.database.dialect,
        dialectOptions: {
            multipleStatements: true
        },
        operatorsAliases: false
    }
};
