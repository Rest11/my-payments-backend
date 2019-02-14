import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { LoginTicket, TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { Injectables } from '../core/constants';
import { GetTokenResponse } from '../modules/auth/types/get-token.response';

@Injectable()
export class AuthService {
    constructor (
        @Inject(Injectables.GOOGLE_AUTH)
        private readonly client: OAuth2Client,
    ) {}

    public async getEncodedToken (token: string): Promise<GetTokenResponse> {
        const encodedToken: any = jwt.sign(token, config.auth.secretTokenKey);

        return {
            currentToken: encodedToken,
        };
    }

    public async checkUserToken (authToken: string): Promise<TokenPayload | null> {
        try {
            const decodedToken: any = jwt.verify(authToken, config.auth.secretTokenKey);
            const ticket: LoginTicket = await this.client.verifyIdToken({
                idToken: decodedToken,
                audience: config.auth.google.clientID,
            });

            return ticket.getPayload();
        } catch (err) {
            return null;
        }
    }
}
