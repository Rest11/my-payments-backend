import { CustomFactory } from '@nestjs/core/injector/module';
import { Injectables } from "../../constants";
import { OAuth2Client } from 'google-auth-library';
import { config } from '../../../../config/config';

export const googleAuthProvider: CustomFactory = {
    name: Injectables.GOOGLE_AUTH,
    provide: Injectables.GOOGLE_AUTH,
    useFactory: () => new OAuth2Client(config.auth.google.clientID),
};
