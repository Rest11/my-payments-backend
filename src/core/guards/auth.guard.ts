import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { RequestParams } from '../constants';
import { UserResponse } from '../types/user-response';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private readonly authService: AuthService,
    ) {}

    public async canActivate (context: ExecutionContext): Promise<boolean> {
        const userToken: string = context.switchToHttp().getRequest().headers[RequestParams.AUTHORIZATION];
        const authPlatform: string = context.switchToHttp().getRequest().headers[RequestParams.AUTH_PLATFORM];

        const user: UserResponse | null = await this.authService.checkUserToken(userToken, authPlatform);

        return !!user;
    }
}
