import * as Sequelize from 'sequelize';
import { UserInstance } from './user.instance';
import { UserType } from './user.type';

export interface UserModel extends Sequelize.Model<UserInstance, UserType> {
    // class methods
}
