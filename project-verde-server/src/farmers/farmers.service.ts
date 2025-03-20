import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { AuthenticationService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { Farmer, FarmerDocument } from "../users/users.schema";

@Injectable()
export class FarmersService {
  constructor(
    @InjectModel(Farmer.name) private farmerModel: Model<FarmerDocument>,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthenticationService)) private readonly authenticationService: AuthenticationService,
  ) {}

  async findFarmerById(farmerId: string): Promise<any> {
    const farmer = await this.farmerModel.findOne({ farmerId }).exec();
    if (!farmer) {
      throw new NotFoundException(`Farmer with ID ${farmerId} not found`);
    }
    const user = await this.usersService.findUserById(new Types.ObjectId(farmer._id));
    if (!user) {
      throw new NotFoundException(`User with ID ${farmer._id} not found`);
    }
    return { farmer, user };
  }

  async updateFarmer(farmerId: string, updatedFarmer: Partial<Farmer>): Promise<Farmer> {
    const farmer = await this.farmerModel.findOneAndUpdate(
      { farmerId },
      updatedFarmer,
      { new: true },
    ).exec();
    if (!farmer) {
      throw new NotFoundException(`Farmer with ID ${farmerId} not found`);
    }
    return farmer;
  }

  async addToAvailableItems(farmerId: string, itemId: Types.ObjectId, price: number): Promise<void> {
    await this.farmerModel.findOneAndUpdate(
      { farmerId },
      {
        $push: {
          availableItems: {
            itemId,
            price: price,
          },
        },
      },
      { new: true },
    ).exec();
  }

  async removeFromAvailableItems(farmerId: string, itemId: Types.ObjectId): Promise<void> {
    const farmer = await this.farmerModel.findOne({ farmerId }).exec();

    if (!farmer) {
      throw new NotFoundException(`Farmer with ID ${farmerId} not found`);
    }

    const item = farmer.availableItems.find(
      (item) => item.itemId.toString() === itemId.toString(),
    );

    if (!item) {
      throw new NotFoundException(`Item with ID ${itemId} not found in farmer's available items`);
    }

    await farmer.save();
  }

  async updateRating(userId: string, newRating: number): Promise<void> {
    const farmer = await this.farmerModel.findById(userId).exec();
  
    if (!farmer) {
      throw new NotFoundException(`Farmer with ID ${userId} not found`);
    }
  
    farmer.rating.totalRating += newRating;
    farmer.rating.raters += 1;
  
    await farmer.save();
  }
  
  async getRating(userId: string): Promise<number> {
    const farmer = await this.farmerModel.findById(userId).exec();
  
    if (!farmer) {
      throw new NotFoundException(`Farmer with ID ${userId} not found`);
    }
  
    if (farmer.rating.raters === 0) {
      return 0; // Avoid division by zero
    }
  
    return farmer.rating.totalRating / farmer.rating.raters;
  }  
}