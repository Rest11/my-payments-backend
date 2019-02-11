import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { LoginTicket, TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import { config } from '../../config/config';
import { CheckingTokenDto } from '../modules/auth/types/checking-token.dto';
import { Injectables } from '../core/constants';

@Injectable()
export class AuthService {
    constructor (
        @Inject(Injectables.GOOGLE_AUTH)
        private readonly client: OAuth2Client,
    ) {}

    public async checkUserToken (authToken: CheckingTokenDto): Promise<TokenPayload | null> {
        try {
            const ticket: LoginTicket = await this.client.verifyIdToken({
                idToken: authToken.currentToken,
                audience: config.auth.google.clientID,
            });

            return ticket.getPayload();
        } catch (err) {
            return null;
        }
    }
}
