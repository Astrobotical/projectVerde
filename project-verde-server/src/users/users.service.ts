import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument, Farmer, FarmerDocument, Buyer, BuyerDocument } from "./users.schema";
import { Model, Types } from "mongoose";
import { AuthenticationService } from "src/auth/auth.service";
import { UpdateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Farmer.name) private farmerModel: Model<FarmerDocument>,
    @InjectModel(Buyer.name) private buyerModel: Model<BuyerDocument>,
    @Inject(forwardRef(() => AuthenticationService))
    private readonly authenticationService: AuthenticationService,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(userId: Types.ObjectId): Promise<Farmer | Buyer> {
    let farmer = await this.farmerModel.findById(userId).exec();
    
    if (!farmer) {
      let buyer = await this.buyerModel.findById(userId).exec();
      if (!buyer) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return buyer;
    }
    return farmer;
  }
  

  async createUser(user: Partial<User>): Promise<User> {
    const { exists, userId } = await this.authenticationService.userExistsByEmail(user.email);
    if (!exists) {
      throw new BadRequestException("Please register before creating a user");
    }
  
    user._id = userId.toString();
  
    let newUser: UserDocument;
  
    if (user.userType === 'Farmer') {
      newUser = new this.farmerModel(user);
    } else if (user.userType === 'Buyer') {
      newUser = new this.buyerModel(user);
    } else {
      throw new BadRequestException("Invalid user type");
    }
  
    return newUser.save();
  }  

  async updateUser(userId: Types.ObjectId, updatedUser: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, updatedUser, { new: true }).exec();
  }

  async deleteUser(userId: Types.ObjectId): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(userId).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
}
