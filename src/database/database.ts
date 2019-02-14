import * as SequelizeInstance from 'sequelize';
// noinspection TsLint
import { Instance, Sequelize } from 'sequelize';
import { config } from '../../config/config';
import { UserProvider } from './models/user/user.provider';
import { UserModel } from './models/user/user.model';
import { DonationModel } from './models/donation/donation.model';
import { DonationProvider } from './models/donation/donation.provider';

export class Database {
    private readonly sequelize: Sequelize;
    private readonly models: SequelizeInstance.Model<Instance<any>, any>[] = [];

    public readonly userModel: UserModel;
    public readonly donationModel: DonationModel;

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

        // Defining table models
        this.userModel = UserProvider.defineModel(this.sequelize);
        this.donationModel = DonationProvider.defineModel(this.sequelize);

        // Creating association models
        DonationProvider.associateModel(this.donationModel, this.userModel);

        // the order is important. Make sure a table that has foreign keys will be created after the main table
        this.models = [
            this.userModel,
            this.donationModel,
        ];
    }

    // Creating all tables
    public async create (): Promise<void> {
        // you can not use Promise.all because the order of tables is important
        for (const model of this.models) {
            await model.sync({ force: false });
        }
    }
}
