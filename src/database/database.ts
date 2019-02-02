import * as SequelizeInstance from 'sequelize';
// noinspection TsLint
import { Instance, Sequelize } from 'sequelize';
import { config } from '../../config/config';
import { UserProvider } from './models/user/user.provider';

export class Database {
    private readonly sequelize: Sequelize;
    private models: SequelizeInstance.Model<Instance<any>, any>[] = [];

    constructor () {
        this.sequelize = new SequelizeInstance(
            config.database.schema,
            config.database.userName,
            config.database.password,
            {
                dialect: config.database.dialect,
                dialectOptions: {
                    multipleStatements: true,
                },
                host: config.database.host,
                logging: false,
                operatorsAliases: false,
                define: {
                    timestamps: true,
                },
                pool: {
                    idle: config.database.idle,
                    max: config.database.maxPoolConnection,
                },
            },
        );

        this.models = [
            UserProvider.defineModel(this.sequelize),
        ];
    }

    // Creating all tables
    public async create (): Promise<void> {
        await Promise.all(
            this.models.map((model: SequelizeInstance.Model<Instance<any>, any>) => model.sync({ force: false })),
        );
    }
}
