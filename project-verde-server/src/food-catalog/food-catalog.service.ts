import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from 'src/food/schema/food.schema';
import { FoodCategory } from '../../../enums/foodCategory.emun';
import { Farmer, FarmerDocument } from 'src/users/users.schema';

@Injectable()
export class FoodCatalogService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
    @InjectModel(Farmer.name) private farmerModel: Model<FarmerDocument>,
  ) {}

  async findFoodAvailability(foodName: string) {
    // Find the food by name
    const food = await this.foodModel.findOne({ name: foodName }).exec();
    if (!food) {
      throw new NotFoundException(`Food with name '${foodName}' not found`);
    }

    const foodId = food._id.toString();

    this.findAllAvailableFoods(foodId);
  }

  async findAllAvailableFoods(foodId: string): Promise<{ itemId: string; price: number; }[]> {
    const availableItems: { itemId: string; price: number }[] = [];

    // Find farmers who have this food available
    const farmers = await this.farmerModel.find({ 'availableItems.itemId': foodId }).exec();

    // Collect all available items from farmers
    farmers.forEach(farmer => {
      farmer.availableItems.forEach(item => {
        if (item.itemId.toString() === foodId) {
          availableItems.push({ itemId: item.itemId, price: item.price });
        }
      });
    });

    return availableItems;
  }

  async findFoodsByCategory(category: FoodCategory): Promise<Food[]> {
    // Find all foods within the specified category
    const foods = await this.foodModel.find({ category }).exec();
    if (!foods.length) {
      throw new NotFoundException(`No foods found in category '${category}'`);
    }
    return foods;
  }
}
