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
        const userData: TokenPayload | null = await this.authService.checkUserToken(userToken);
        const userDto: UserType = {
            externalId: userData.sub,
            name: userData.name,
            email: userData.email,
            avatar: userData.picture,
        };

        const result: [ UserInstance, boolean ] = await this.userService.saveUser(userDto);

        return result[0];
    }
}
