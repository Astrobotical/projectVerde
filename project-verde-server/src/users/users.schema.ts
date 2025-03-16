import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Food } from '../food/schema/food.schema';

export type UserDocument = User & Document;

@Schema()
export class Rating {
  @Prop({ required: true })
  raters: number;

  @Prop({ required: true })
  totalRating: number;
}

@Schema()
export class Name {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}

export const NameSchema = SchemaFactory.createForClass(Name);

@Schema()
export class Coordinates {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}

export const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);

@Schema()
export class AvailableItem {
  @Prop({ type: Types.ObjectId, ref: Food.name, required: true })
  itemId: string;

  @Prop({ required: true })
  price: number;
}

export const AvailableItemSchema = SchemaFactory.createForClass(AvailableItem);

@Schema({ discriminatorKey: 'userType' }) // Allows different user types
export class User {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: Name;

  @Prop({ type: CoordinatesSchema, required: true })
  coordinates: Coordinates;

  @Prop({ required: true, default: 0 })
  walletBalance: number;

  @Prop({ required: true, enum: ['Farmer', 'Buyer'] }) // Specify user type
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type FarmerDocument = Farmer & Document;

@Schema()
export class Farmer extends User {
  @Prop({ required: true, default: 0 })
  rating: Rating;

  @Prop({ type: [AvailableItemSchema], default: [] })
  availableItems: AvailableItem[];
}

export const FarmerSchema = SchemaFactory.createForClass(Farmer);

export type BuyerDocument = Buyer & Document;

@Schema()
export class Buyer extends User {
  @Prop({ type: [{ type: Types.ObjectId, ref: Food.name }], default: [] })
  favoriteFoods: Types.ObjectId[];
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
