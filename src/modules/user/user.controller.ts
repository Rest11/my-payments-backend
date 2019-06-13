import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Rest } from '../../core/contracts/rest.contract';
import { AuthService } from '../../services/auth.service';
import { UserType } from '../../database/models/user/user.type';
import { UserService } from './user.service';
import { DatabaseContract } from '../../core/contracts/database.contract';
import { RequestHeaderParams } from '../../core/constants';
import { UserData } from '../../core/types/user-data';
import { UserResponse } from './types/user-response';

@Controller(Rest.User.BASE)
export class UserController {
    constructor (
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    public async saveUser (
        @Headers(RequestHeaderParams.AUTHORIZATION) userToken: string,
        @Headers(RequestHeaderParams.AUTH_PLATFORM) authPlatform: string,
    ): Promise<UserResponse> {
        const userData: UserData | null = await this.authService.checkUserToken(userToken, authPlatform);
        const userDto: UserType = {
            [DatabaseContract.Users.PROPERTY_EXTERNAL_ID]: userData.id,
            [DatabaseContract.Users.PROPERTY_NAME]: userData.name,
            [DatabaseContract.Users.PROPERTY_EMAIL]: userData.email,
            [DatabaseContract.Users.PROPERTY_AVATAR]: userData.avatar,
        };

        return  this.userService.saveUser(userDto);
    }
}
