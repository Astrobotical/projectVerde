import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { Farmer } from 'src/users/users.schema';
import { Types } from 'mongoose';
@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Get(':farmerId')
  async findFarmerById(@Param('farmerId') farmerId: string): Promise<Farmer> {
    return this.farmersService.findFarmerById(farmerId);
  }

  @Post(':farmerId/items/:itemId')
  async addToAvailableItems(
    @Param('farmerId') farmerId: string,
    @Param('itemId') itemId: Types.ObjectId,
    @Body('price') price: number
  ) {
    return this.farmersService.addToAvailableItems(farmerId, itemId, price);
  }

  @Patch(':farmerId/rating')
  async updateRating(
    @Param('farmerId') farmerId: string,
    @Body('rating') rating: number
  ) {
    return this.farmersService.updateRating(farmerId, rating);
  }

  @Get(':farmerId/rating')
  async getRating(@Param('farmerId') farmerId: string): Promise<number> {
    return this.farmersService.getRating(farmerId);
  }
}
