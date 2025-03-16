import { Model, Types } from "mongoose";
import { AuthenticationService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { Farmer, FarmerDocument } from "../users/users.schema";
export declare class FarmersService {
    private farmerModel;
    private readonly usersService;
    private readonly authenticationService;
    constructor(farmerModel: Model<FarmerDocument>, usersService: UsersService, authenticationService: AuthenticationService);
    findFarmerById(farmerId: string): Promise<any>;
    updateFarmer(farmerId: string, updatedFarmer: Partial<Farmer>): Promise<Farmer>;
    addToAvailableItems(farmerId: string, itemId: Types.ObjectId, price: number): Promise<void>;
    removeFromAvailableItems(farmerId: string, itemId: Types.ObjectId): Promise<void>;
    updateRating(userId: string, newRating: number): Promise<void>;
    getRating(userId: string): Promise<number>;
}
