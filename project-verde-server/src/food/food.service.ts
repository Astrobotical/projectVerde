import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from './schema/food.schema';
import { CreateFoodDto, UpdateFoodDto } from './food.dto';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async addFood(createFoodDto: CreateFoodDto): Promise<Food> {
    const newFood = new this.foodModel(createFoodDto);
    return newFood.save();
  }

  async findFoodById(foodId: string): Promise<Food> {
    const food = await this.foodModel.findById(foodId).exec();
    if (!food) {
      throw new NotFoundException(`Food with ID ${foodId} not found`);
    }
    return food;
  }

  async updateFood(foodId: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const updatedFood = await this.foodModel.findByIdAndUpdate(foodId, updateFoodDto, { new: true }).exec();
    if (!updatedFood) {
      throw new NotFoundException(`Food with ID ${foodId} not found`);
    }
    return updatedFood;
  }
}
