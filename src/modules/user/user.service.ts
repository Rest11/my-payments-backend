import { Inject, Injectable } from '@nestjs/common';
import { Injectables } from '../../core/constants';
import { Database } from '../../database/database';
import { UserInstance } from '../../database/models/user/user.instance';
import { UserType } from '../../database/models/user/user.type';
import { DatabaseContract } from '../../core/contracts/database.contract';

@Injectable()
export class UserService {
    constructor (
        @Inject(Injectables.DATABASE)
        private readonly database: Database,
    ) {}

    public async saveUser (userDto: UserType): Promise<[ UserInstance, boolean ]> {
        return this.database.userModel.findOrCreate({
            where: {
                [DatabaseContract.Users.PROPERTY_EXTERNAL_ID]: userDto.externalId,
            },
            defaults: userDto,
            attributes: [
                DatabaseContract.Users.PROPERTY_NAME,
                DatabaseContract.Users.PROPERTY_EMAIL,
                DatabaseContract.Users.PROPERTY_AVATAR,
            ],
        });
    }
}
