import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserCredentialsDocument = UserCredentials & Document;

@Schema()
export class UserCredentials {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserCredentialsSchema = SchemaFactory.createForClass(UserCredentials);