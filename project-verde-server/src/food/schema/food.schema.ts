import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FoodCategory } from '../../../../enums/foodCategory.emun';

export type FoodDocument = Food & Document;

@Schema()
export class Food {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  format: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: FoodCategory })
  category: FoodCategory;
}

export const FoodSchema = SchemaFactory.createForClass(Food);