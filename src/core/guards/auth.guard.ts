import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { RequestHeaderParams } from '../constants';
import { UserData } from '../types/user-data';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private readonly authService: AuthService,
    ) {}

    public async canActivate (context: ExecutionContext): Promise<boolean> {
        const userToken: string = context.switchToHttp().getRequest().headers[RequestHeaderParams.AUTHORIZATION];
        const authPlatform: string = context.switchToHttp().getRequest().headers[RequestHeaderParams.AUTH_PLATFORM];

        const user: UserData | null = await this.authService.checkUserToken(userToken, authPlatform);

        return !!user;
    }
}
