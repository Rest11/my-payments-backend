import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGoogleService } from './auth-google.service';
import { googleAuthProvider } from '../core/utils/google-auth/google-auth.provider';
import { AuthFacebookService } from './auth-facebook.service';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        AuthService,
        AuthGoogleService,
        googleAuthProvider,
        AuthFacebookService,
    ],
    exports: [
        AuthService,
        AuthGoogleService,
        googleAuthProvider,
        AuthFacebookService,
    ],
})
export class AuthServicesModule { }
