import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { databaseProvider } from '../../database/database.provider';
import { AuthService } from '../../services/auth.service';

@Module({
    providers: [
        AuthService,
        // databaseProvider, // TODO: check if it works because it was imported to the app.module.ts
    ],
    controllers: [
        UserController,
    ],
})
export class UserModule { }
