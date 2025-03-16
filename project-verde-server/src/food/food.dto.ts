import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FoodCategory } from '../../../enums/foodCategory.emun';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  format: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(FoodCategory)
  category: FoodCategory;
}

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}
