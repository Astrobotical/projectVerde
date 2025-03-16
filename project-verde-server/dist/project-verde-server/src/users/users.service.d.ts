import { User, UserDocument, FarmerDocument, BuyerDocument } from "./users.schema";
import { Model, Types } from "mongoose";
import { AuthenticationService } from "src/auth/auth.service";
import { UpdateUserDto } from "./users.dto";
export declare class UsersService {
    private userModel;
    private farmerModel;
    private buyerModel;
    private readonly authenticationService;
    constructor(userModel: Model<UserDocument>, farmerModel: Model<FarmerDocument>, buyerModel: Model<BuyerDocument>, authenticationService: AuthenticationService);
    findAllUsers(): Promise<User[]>;
    findUserById(userId: Types.ObjectId): Promise<User>;
    createUser(user: Partial<User>): Promise<User>;
    updateUser(userId: Types.ObjectId, updatedUser: UpdateUserDto): Promise<User>;
    deleteUser(userId: Types.ObjectId): Promise<void>;
}
