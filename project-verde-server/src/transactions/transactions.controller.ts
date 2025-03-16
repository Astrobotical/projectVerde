import { Controller, Post, Patch, Param, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, UpdateTransactionStatusDto } from './transactions.dto';
import { Types } from 'mongoose';
import { SocketGateway } from './socket.gateway';


@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionsService.createTransaction(createTransactionDto);
    
    // Emit real-time confirmation event to buyer
    this.socketGateway.server.emit(`transaction-update-${transaction.buyerId}`, {
      transactionId: transaction.transactionId,
      status: transaction.status,
    });

    // Simulate status updates every 10 seconds
    this.simulateStatusUpdates(transaction.transactionId, transaction.buyerId);

    return transaction;
  }

  @Patch(':transactionId/status')
  async updateTransactionStatus(
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionStatusDto: UpdateTransactionStatusDto,
  ) {
    const transaction = await this.transactionsService.updateTransactionStatus(
      new Types.ObjectId(transactionId),
      updateTransactionStatusDto.status,
    );

    // Emit updated status to buyer
    this.socketGateway.server.emit(`transaction-update-${transaction.buyerId}`, {
      transactionId: transaction.transactionId,
      status: transaction.status,
    });

    return transaction;
  }

  private async simulateStatusUpdates(transactionId: string, buyerId: Types.ObjectId) {
    const statuses = ['confirmed', 'in transit', 'delivered'];
    
    for (const status of statuses) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds

      await this.transactionsService.updateTransactionStatus(new Types.ObjectId(transactionId), status);

      this.socketGateway.server.emit(`transaction-update-${buyerId}`, {
        transactionId,
        status,
      });

      if (status === 'delivered') {
        await this.transactionsService.markTransactionDelivered(new Types.ObjectId(transactionId));
      }
    }
  }
}
