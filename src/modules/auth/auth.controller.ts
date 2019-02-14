import { Body, Controller, Post } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import { Rest } from '../../core/contracts/rest.contract';
import { AuthService } from '../../services/auth.service';
import { CheckingTokenDto } from './types/checking-token.dto';
import { CheckingTokenResponse } from './types/checking-token.response';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { CHECKING_TOKEN } from './schemas/checking-token.schema';
import { GET_TOKEN } from './schemas/get-token.schema';
import { GetTokenDto } from './types/get-token.dto';
import { GetTokenResponse } from './types/get-token.response';

@Controller(Rest.Auth.BASE)
export class AuthController {
    constructor (
        private readonly authService: AuthService,
    ) {}

    @Post()
    public async checkingToken (
        @Body(new ValidationPipe(CHECKING_TOKEN)) token: CheckingTokenDto,
    ): Promise<CheckingTokenResponse> {
        const checking: CheckingTokenResponse = {
            isAuthenticated: false,
        };

        if (!token.currentToken) return checking;

        const result: TokenPayload | null = await this.authService.checkUserToken(token.currentToken);

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
