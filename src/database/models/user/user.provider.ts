import { DefineOptions, Sequelize } from 'sequelize';
import { UserInstance } from './user.instance';
import { UserModel } from './user.model';
import { UserType } from './user.type';
import { DatabaseContract } from '../../../core/contracts/database.contract';
import { userSchema } from './user.schema';
import { config } from '../../../../config/config';

export class UserProvider {
    private static options: DefineOptions<UserInstance> = {
        timestamps: true,
        charset: config.database.charset,
    };

    public static defineModel (sequelize: Sequelize): UserModel {
        return sequelize.define<UserInstance, UserType>(
            DatabaseContract.Users.TABLE_NAME,
            userSchema,
            this.options,
        );
    }

}
