import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { GetTokenResponse } from '../modules/auth/types/get-token.response';
import { AuthGoogleService } from './auth-google.service';
import { AuthPlatform } from '../core/constants';
import { UserResponse } from '../core/types/user-response';
import { AuthFacebookService } from './auth-facebook.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly authGoogleService: AuthGoogleService,
        private readonly authFacebookService: AuthFacebookService,
    ) {}

    public async getEncodedToken (token: string): Promise<GetTokenResponse> {
        const encodedToken: any = jwt.sign(token, config.auth.secretTokenKey);

        return {
            currentToken: encodedToken,
        };
    }

    public async checkUserToken (authToken: string, authPlatform: string): Promise<UserResponse | null> {
        try {
            let userData: UserResponse | null = null;
            const decodedToken: any = jwt.verify(authToken, config.auth.secretTokenKey);

            switch (authPlatform) {
                case AuthPlatform.GOOGLE:
                    userData = await this.authGoogleService.getUser(decodedToken);
                    break;
                case AuthPlatform.FACEBOOK:
                    userData = await this.authFacebookService.getUser(decodedToken);
                    break;
            }

            return userData;
        } catch (err) {
            return null;
        }
    }
}
