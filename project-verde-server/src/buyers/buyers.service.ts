import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Food, FoodDocument } from 'src/food/schema/food.schema';
import { Buyer, BuyerDocument } from 'src/users/users.schema';

@Injectable()
export class BuyersService {
  constructor(
    @InjectModel(Buyer.name) private buyerModel: Model<BuyerDocument>,
    @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
  ) {}

  async addToFavorites(buyerId: Types.ObjectId, foodId: Types.ObjectId): Promise<Buyer> {
    const buyer = await this.buyerModel.findById(buyerId).exec();
    if (!buyer) {
      throw new NotFoundException(`Buyer with ID '${buyerId}' not found`);
    }

    const food = await this.foodModel.findById(foodId).exec();
    if (!food) {
      throw new NotFoundException(`Food with ID '${foodId}' not found`);
    }

    if (!buyer.favoriteFoods.includes(foodId)) {
      buyer.favoriteFoods.push(foodId);
      await buyer.save();
    }

    return buyer;
  }

  async removeFromFavorites(buyerId: Types.ObjectId, foodId: Types.ObjectId): Promise<Buyer> {
    const buyer = await this.buyerModel.findById(buyerId).exec();
    if (!buyer) {
      throw new NotFoundException(`Buyer with ID '${buyerId}' not found`);
    }

    buyer.favoriteFoods = buyer.favoriteFoods.filter(id => id !== foodId);
    await buyer.save();

    return buyer;
  }
}
