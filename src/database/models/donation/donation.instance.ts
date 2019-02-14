import { Instance } from 'sequelize';
import { CommonType } from '../../types/common.type';
import { DonationType } from './donation.type';

export interface DonationInstance extends Instance<DonationType>, DonationType, CommonType {
}
