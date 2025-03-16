import { Model } from 'mongoose';
import { Food, FoodDocument } from './schema/food.schema';
import { CreateFoodDto, UpdateFoodDto } from './food.dto';
export declare class FoodService {
    private foodModel;
    constructor(foodModel: Model<FoodDocument>);
    addFood(createFoodDto: CreateFoodDto): Promise<Food>;
    findFoodById(foodId: string): Promise<Food>;
    updateFood(foodId: string, updateFoodDto: UpdateFoodDto): Promise<Food>;
}
