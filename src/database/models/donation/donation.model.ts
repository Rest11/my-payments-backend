import * as Sequelize from 'sequelize';
import { DonationInstance } from './donation.instance';
import { DonationType } from './donation.type';

export interface DonationModel extends Sequelize.Model<DonationInstance, DonationType> {
    // class methods
}
