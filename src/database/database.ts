import * as SequelizeInstance from 'sequelize';
// noinspection TsLint
import { Instance, Sequelize } from 'sequelize';
import { config } from '../../config/config';
import { UserProvider } from './models/user/user.provider';
import { UserModel } from './models/user/user.model';

export class Database {
    private readonly sequelize: Sequelize;
    private readonly models: SequelizeInstance.Model<Instance<any>, any>[] = [];

    public readonly userModel: UserModel;

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

        this.userModel = UserProvider.defineModel(this.sequelize);

        this.models = [
            this.userModel,
        ];
    }

    // Creating all tables
    public async create (): Promise<void> {
        await Promise.all(
            this.models.map((model: SequelizeInstance.Model<Instance<any>, any>) => model.sync({ force: false })),
        );
    }
}
