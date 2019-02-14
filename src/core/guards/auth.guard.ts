import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import { RequestParams } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private readonly authService: AuthService,
    ) {}

    public async canActivate (context: ExecutionContext): Promise<boolean> {
        const userToken: string = context.switchToHttp().getRequest().headers[RequestParams.AUTHORIZATION];
        const user: TokenPayload | null = await this.authService.checkUserToken(userToken);

        return !!user;
    }
}
