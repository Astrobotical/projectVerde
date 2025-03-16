import { BuyersService } from './buyers.service';
import { Types } from 'mongoose';
import { Buyer } from 'src/users/users.schema';
export declare class BuyersController {
    private readonly buyersService;
    constructor(buyersService: BuyersService);
    addToFavorites(userId: Types.ObjectId, foodId: Types.ObjectId): Promise<Buyer>;
    removeFromFavorites(buyerId: Types.ObjectId, foodId: Types.ObjectId): Promise<Buyer>;
}
