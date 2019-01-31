import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProvider } from './database/database.provider';

@Module({
    imports: [],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
        databaseProvider,
    ],
})
export class AppModule {}
