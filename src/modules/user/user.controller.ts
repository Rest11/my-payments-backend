import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Rest } from '../../core/contracts/rest.contract';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { CHECKING_TOKEN } from '../auth/schemas/checking-token.schema';
import { CheckingTokenDto } from '../auth/types/checking-token.dto';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import { AuthService } from '../../services/auth.service';
import { UserType } from '../../database/models/user/user.type';
import { UserService } from './user.service';
import { UserInstance } from '../../database/models/user/user.instance';
import { DatabaseContract } from '../../core/contracts/database.contract';

@Controller(Rest.User.BASE)
export class UserController {
    constructor (
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    public async saveUser (
        @Body(new ValidationPipe(CHECKING_TOKEN)) userToken: CheckingTokenDto,
    ): Promise<UserInstance> {
        const userData: TokenPayload | null = await this.authService.checkUserToken(userToken.currentToken);
        const userDto: UserType = {
            [DatabaseContract.Users.PROPERTY_EXTERNAL_ID]: userData.sub,
            [DatabaseContract.Users.PROPERTY_NAME]: userData.name,
            [DatabaseContract.Users.PROPERTY_EMAIL]: userData.email,
            [DatabaseContract.Users.PROPERTY_AVATAR]: userData.picture,
        };

        const result: [ UserInstance, boolean ] = await this.userService.saveUser(userDto);

        return result[0];
    }
}
