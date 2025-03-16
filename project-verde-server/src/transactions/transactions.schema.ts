import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: String, required: true }) 
  transactionId: string; 

  @Prop({ type: Types.ObjectId, required: true, ref: 'Farmer' })
  farmerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Buyer' })
  buyerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Food' }], required: true })
  items: Types.ObjectId[];

  @Prop({ required: true, default: 'pending' })
  status: string; // pending, confirmed, in transit, delivered

  @Prop({ required: true, default: Date.now })
  boughtAt: Date;

  @Prop()
  deliveredAt?: Date; // Optional, updates when transaction is completed

  @Prop({ required: true })
  totalPrice: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
