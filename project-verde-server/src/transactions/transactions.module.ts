import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionGateway } from './transactions.gateway';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionSchema } from './transactions.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionGateway],
  exports: [TransactionsService]
})
export class TransactionsModule {}
