import { Model, Types } from 'mongoose';
import { FoodDocument } from 'src/food/schema/food.schema';
import { Buyer, BuyerDocument } from 'src/users/users.schema';
export declare class BuyersService {
    private buyerModel;
    private foodModel;
    constructor(buyerModel: Model<BuyerDocument>, foodModel: Model<FoodDocument>);
    addToFavorites(buyerId: Types.ObjectId, foodId: Types.ObjectId): Promise<Buyer>;
    removeFromFavorites(buyerId: Types.ObjectId, foodId: Types.ObjectId): Promise<Buyer>;
}
