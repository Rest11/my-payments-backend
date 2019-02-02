import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { LoginTicket, TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import { config } from '../../config/config';
import { CheckingTokenDto } from '../modules/auth/types/checking-token.dto';

@Injectable()
export class AuthService {
    private readonly client: OAuth2Client = new OAuth2Client(config.auth.google.clientID);

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
