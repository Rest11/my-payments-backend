import { Body, Controller, Post } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import { Rest } from '../../core/contracts/rest.contract';
import { AuthService } from '../../services/auth.service';
import { CheckingTokenDto } from './types/checking-token.dto';
import { CheckingTokenResponse } from './types/checking-token.response';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { CHECKING_TOKEN } from './schemas/checking-token.schema';

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

        const result: TokenPayload | null = await this.authService.checkUserToken(token);

        checking.isAuthenticated = !!result;

        return checking;
    }
}
