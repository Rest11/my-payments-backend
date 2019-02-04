import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { databaseProvider } from '../../database/database.provider';
import { AuthService } from '../../services/auth.service';
import { UserService } from './user.service';

@Module({
    providers: [
        AuthService,
        UserService,
        databaseProvider,
    ],
    controllers: [
        UserController,
    ],
})
export class UserModule { }
