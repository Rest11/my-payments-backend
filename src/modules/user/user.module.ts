import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { databaseProvider } from '../../database/database.provider';
import { UserService } from './user.service';
import { AuthServicesModule } from '../../services/auth-services.module';

@Module({
    imports: [
        AuthServicesModule,
    ],
    providers: [
        UserService,
        databaseProvider,
    ],
    controllers: [
        UserController,
    ],
})
export class UserModule { }
