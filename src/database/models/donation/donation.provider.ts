import { AssociationOptionsBelongsTo, DefineOptions, Sequelize } from 'sequelize';
import { DatabaseContract } from '../../../core/contracts/database.contract';
import { DonationInstance } from './donation.instance';
import { DonationType } from './donation.type';
import { DonationModel } from './donation.model';
import { donationSchema } from './donation.schema';
import { DbReferentialActions } from '../../../core/constants';
import { UserModel } from '../user/user.model';

export class DonationProvider {
    private static options: DefineOptions<DonationInstance> = {
        timestamps: true,
    };

    public static defineModel (sequelize: Sequelize): DonationModel {
        return sequelize.define<DonationInstance, DonationType>(
            DatabaseContract.Donations.TABLE_NAME,
            donationSchema,
            this.options,
        );
    }

    public static associateModel (currentModel: DonationModel, associateModel: UserModel): void {
        const options: AssociationOptionsBelongsTo = {
            foreignKey: {
                name: DatabaseContract.Donations.COLUMN_FK_USER_EXTERNAL_ID,
            },
            onDelete: DbReferentialActions.RESTRICT as string,
            constraints: true,
            as: DatabaseContract.Users.ALIAS,
        };

        currentModel.belongsTo(associateModel, options);
    }
}
