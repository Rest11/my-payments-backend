import { Inject, Injectable } from '@nestjs/common';
import { Injectables } from '../../core/constants';
import { Database } from '../../database/database';
import { UserInstance } from '../../database/models/user/user.instance';
import { UserType } from '../../database/models/user/user.type';
import { DatabaseContract } from '../../core/contracts/database.contract';
import { UserResponse } from './types/user-response';

@Injectable()
export class UserService {
    constructor (
        @Inject(Injectables.DATABASE)
        private readonly database: Database,
    ) {}

    public async saveUser (userDto: UserType): Promise<UserResponse> {
        const user: UserInstance = await this.database.userModel.findOne({
            where: {
                [DatabaseContract.Users.PROPERTY_EXTERNAL_ID]: userDto[DatabaseContract.Users.PROPERTY_EXTERNAL_ID],
            },
        });

        if (!user) {
            await this.database.userModel.create(userDto);
        } else {
            await user.update({
                [DatabaseContract.Users.PROPERTY_NAME]: userDto[DatabaseContract.Users.PROPERTY_NAME],
                [DatabaseContract.Users.PROPERTY_EMAIL]: userDto[DatabaseContract.Users.PROPERTY_EMAIL],
                [DatabaseContract.Users.PROPERTY_AVATAR]: userDto[DatabaseContract.Users.PROPERTY_AVATAR],
            })[1];
        }

        return {
            name: userDto[DatabaseContract.Users.PROPERTY_NAME],
            email: userDto[DatabaseContract.Users.PROPERTY_EMAIL],
            avatar: userDto[DatabaseContract.Users.PROPERTY_AVATAR],
        };
    }
}
