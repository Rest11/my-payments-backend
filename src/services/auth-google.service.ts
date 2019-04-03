import { Inject, Injectable } from '@nestjs/common';
import { Injectables } from '../core/constants';
import { OAuth2Client } from 'google-auth-library';
import { LoginTicket, TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import { config } from '../../config/config';
import { UserResponse } from '../core/types/user-response';

@Injectable()
export class AuthGoogleService {
    constructor (
        @Inject(Injectables.GOOGLE_AUTH)
        private readonly client: OAuth2Client,
    ) {}

    public async getUser (decodedToken: string): Promise<UserResponse | null> {
        try {
            this.client.getAccessToken();
            const ticket: LoginTicket = await this.client.verifyIdToken({
                idToken: decodedToken,
                audience: config.auth.google.clientID,
            });

            const user: TokenPayload = ticket.getPayload();

            return {
                id: user.sub,
                name: user.name,
                email: user.email,
                avatar: user.picture,
            };
        } catch (err) {
            return null;
        }
    }
}
