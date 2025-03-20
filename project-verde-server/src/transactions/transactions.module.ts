import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionGateway } from './transactions.gateway';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionSchema } from './transactions.schema';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionGateway, SocketGateway],
  exports: [TransactionsService]
})
export class TransactionsModule {}
