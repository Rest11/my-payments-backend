import { Module } from '@nestjs/common';
import { databaseProvider } from '../../database/database.provider';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { googleAuthProvider } from '../../core/utils/google-auth/google-auth.provider';

@Module({
    providers: [
        databaseProvider,
        googleAuthProvider, // this provider for AuthService
        AuthService,
        TransactionService,
    ],
    controllers: [
        TransactionController,
    ],
})
export class TransactionModule { }
