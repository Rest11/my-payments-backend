import { Module } from '@nestjs/common';
import { databaseProvider } from '../../database/database.provider';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AuthServicesModule } from '../../services/auth-services.module';

@Module({
    imports: [
        AuthServicesModule,
    ],
    providers: [
        databaseProvider,
        TransactionService,
    ],
    controllers: [
        TransactionController,
    ],
})
export class TransactionModule { }
