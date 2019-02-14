import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentModule } from './modules/payment/payment.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        PaymentModule,
        TransactionModule,
    ],
})
export class AppModule {}
