import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Rest } from '../../core/contracts/rest.contract';
import { AuthService } from '../../services/auth.service';
import { CheckingTokenResponse } from './types/checking-token.response';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { GET_TOKEN } from './schemas/get-token.schema';
import { GetTokenDto } from './types/get-token.dto';
import { GetTokenResponse } from './types/get-token.response';
import { RequestHeaderParams } from '../../core/constants';
import { UserData } from '../../core/types/user-data';

@Controller(Rest.Auth.BASE)
export class AuthController {
    constructor (
        private readonly authService: AuthService,
    ) {}

    @Get()
    public async checkingToken (
        @Headers(RequestHeaderParams.AUTHORIZATION) userToken: string,
        @Headers(RequestHeaderParams.AUTH_PLATFORM) authPlatform: string,
    ): Promise<CheckingTokenResponse> {
        const checking: CheckingTokenResponse = {
            isAuthenticated: false,
        };

        if (!userToken || !authPlatform) return checking;

        const result: UserData | null = await this.authService.checkUserToken(userToken, authPlatform);
        checking.isAuthenticated = !!result;

        return checking;
    }

    @Post(Rest.Auth.GET_TOKEN)
    public async encodedToken (
        @Body(new ValidationPipe(GET_TOKEN)) token: GetTokenDto,
    ): Promise<GetTokenResponse> {
        return this.authService.getEncodedToken(token.currentToken);
    }
}
