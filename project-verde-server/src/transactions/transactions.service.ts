import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './transactions.schema';
import { TransactionGateway } from './transactions.gateway';
import { CreateTransactionDto } from './transactions.dto';


@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private readonly transactionGateway: TransactionGateway
  ) {}

  async createTransaction(createTransaction: CreateTransactionDto) {
    const transaction = new this.transactionModel({
      buyerId: createTransaction.buyerId,
      farmerId: createTransaction.farmerId,
      items: createTransaction.items.map(id => new Types.ObjectId(id)), // Corrected mapping
      totalPrice: createTransaction.totalPrice,
      status: 'confirmed',
    });

    await transaction.save();

    // Emit initial status update to client
    this.transactionGateway.sendStatusUpdate(transaction.buyerId.toString(), transaction._id, 'confirmed');

    // Simulate status updates every 10 seconds
    this.simulateStatusUpdates(transaction._id.toString());

    return transaction;
  }

  async updateTransactionStatus(transactionId: Types.ObjectId, newStatus: string) {
    const transaction = await this.transactionModel.findByIdAndUpdate(transactionId, { status: newStatus }, { new: true });

    if (!transaction) throw new Error('Transaction not found');

    // Notify the client via WebSockets
    this.transactionGateway.sendStatusUpdate(transaction.buyerId.toString(), transactionId, newStatus);

    return transaction;
  }

  private async simulateStatusUpdates(transactionId: string) {
    const statuses = ['in transit', 'delivered'];

    for (const status of statuses) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
      await this.updateTransactionStatus(new Types.ObjectId(transactionId), status);
    }
  }

  async markTransactionDelivered(transactionId: Types.ObjectId): Promise<void> {
    const transaction = await this.transactionModel.findById(transactionId).exec();
  
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${transactionId} not found`);
    }
  
    if (transaction.status === 'delivered') {
      throw new BadRequestException(`Transaction with ID ${transactionId} is already delivered`);
    }
  
    transaction.status = 'delivered';
    transaction.deliveredAt = new Date(); // Store the delivery timestamp
    await transaction.save();
  }
}
