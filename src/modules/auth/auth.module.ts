import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServicesModule } from '../../services/auth-services.module';

@Module({
    imports: [
        AuthServicesModule,
    ],
    controllers: [
        AuthController,
    ],
})

export class AuthModule { }
