import { FarmersService } from './farmers.service';
import { Farmer } from 'src/users/users.schema';
import { Types } from 'mongoose';
export declare class FarmersController {
    private readonly farmersService;
    constructor(farmersService: FarmersService);
    findFarmerById(farmerId: string): Promise<Farmer>;
    addToAvailableItems(farmerId: string, itemId: Types.ObjectId, price: number): Promise<void>;
    updateRating(farmerId: string, rating: number): Promise<void>;
    getRating(farmerId: string): Promise<number>;
}
