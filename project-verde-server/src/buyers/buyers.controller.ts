import { Controller, Post, Delete, Param } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { Buyer } from 'src/users/users.schema';
import { Types } from 'mongoose';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post(':buyerId/favorites/:foodId')
  async addToFavorites(
    @Param('buyerId') buyerId: string,
    @Param('foodId') foodId: string
  ): Promise<Buyer> {
    return this.buyersService.addToFavorites(
      new Types.ObjectId(buyerId),
      new Types.ObjectId(foodId)
    );
  }

  @Delete(':buyerId/favorites/:foodId')
  async removeFromFavorites(
    @Param('buyerId') buyerId: string,
    @Param('foodId') foodId: string
  ): Promise<Buyer> {
    return this.buyersService.removeFromFavorites(
      new Types.ObjectId(buyerId),
      new Types.ObjectId(foodId)
    );
  }
}
