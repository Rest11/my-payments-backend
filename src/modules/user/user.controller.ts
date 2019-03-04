import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Rest } from '../../core/contracts/rest.contract';
import { AuthService } from '../../services/auth.service';
import { UserType } from '../../database/models/user/user.type';
import { UserService } from './user.service';
import { UserInstance } from '../../database/models/user/user.instance';
import { DatabaseContract } from '../../core/contracts/database.contract';
import { RequestParams } from '../../core/constants';
import { UserResponse } from '../../core/types/user-response';

@Controller(Rest.User.BASE)
export class UserController {
    constructor (
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    public async saveUser (
        @Headers(RequestParams.AUTHORIZATION) userToken: string,
        @Headers(RequestParams.AUTH_PLATFORM) authPlatform: string,
    ): Promise<UserInstance> {
        const userData: UserResponse | null = await this.authService.checkUserToken(userToken, authPlatform);
        const userDto: UserType = {
            [DatabaseContract.Users.PROPERTY_EXTERNAL_ID]: userData.id,
            [DatabaseContract.Users.PROPERTY_NAME]: userData.name,
            [DatabaseContract.Users.PROPERTY_EMAIL]: userData.email,
            [DatabaseContract.Users.PROPERTY_AVATAR]: userData.avatar,
        };

        const result: [ UserInstance, boolean ] = await this.userService.saveUser(userDto);

        return result[0];
    }
}
