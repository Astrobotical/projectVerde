import { Model } from 'mongoose';
import { Food, FoodDocument } from 'src/food/schema/food.schema';
import { FoodCategory } from '../../../enums/foodCategory.emun';
import { FarmerDocument } from 'src/users/users.schema';
export declare class FoodCatalogService {
    private foodModel;
    private farmerModel;
    constructor(foodModel: Model<FoodDocument>, farmerModel: Model<FarmerDocument>);
    findFoodAvailability(foodName: string): Promise<void>;
    findAllAvailableFoods(foodId: string): Promise<{
        itemId: string;
        price: number;
    }[]>;
    findFoodsByCategory(category: FoodCategory): Promise<Food[]>;
}
