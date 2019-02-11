import { Module } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import { AuthController } from './auth.controller';
import { googleAuthProvider } from '../../core/utils/google-auth/google-auth.provider';

@Module({
    providers: [
        AuthService,
        googleAuthProvider, // this provider for AuthService
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule { }
