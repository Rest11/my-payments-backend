import { Module } from '@nestjs/common';
import { databaseProvider } from './database/database.provider';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
    ],
    providers: [
        databaseProvider,
    ],
})
export class AppModule {}
