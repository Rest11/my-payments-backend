import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { databaseProvider } from '../../database/database.provider';
import { AuthService } from '../../services/auth.service';
import { UserService } from './user.service';
import { googleAuthProvider } from '../../core/utils/google-auth/google-auth.provider';

@Module({
    providers: [
        AuthService,
        UserService,
        databaseProvider,
        googleAuthProvider, // this provider for AuthService
    ],
    controllers: [
        UserController,
    ],
})
export class UserModule { }
