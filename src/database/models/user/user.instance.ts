import { Instance } from 'sequelize';
import { CommonData } from '../../types/common.type';
import { UserType } from './user.type';

export interface UserInstance extends Instance<UserType>, UserType, CommonData {
}
