import { IsNotEmpty, IsNumber, IsObject, IsArray, IsOptional, IsString } from 'class-validator';
import { Name } from './users.schema';
import { Coordinates } from '../users/users.schema';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNotEmpty()
  _id: string;

  @IsObject()
  @IsNotEmpty()
  name: Name;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsObject()
  @IsNotEmpty()
  coordinates: Coordinates;

  @IsNumber()
  @IsNotEmpty()
  walletBalance: number;

  @IsString()
  @IsNotEmpty()
  userType: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}