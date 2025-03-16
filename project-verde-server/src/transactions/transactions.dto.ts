import { IsNotEmpty, IsMongoId, IsNumber, IsArray, IsOptional, IsEnum } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTransactionDto {
  @IsMongoId()
  @IsNotEmpty()
  farmerId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  buyerId: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true }) // Validate each item in the array as MongoID
  items: Types.ObjectId[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}

export class UpdateTransactionStatusDto {
  @IsEnum(['pending', 'confirmed', 'in transit', 'delivered'])
  @IsNotEmpty()
  status: string;
}