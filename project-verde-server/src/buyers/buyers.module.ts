import { Module } from '@nestjs/common';
import { BuyersController } from './buyers.controller';
import { BuyersService } from './buyers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Buyer, BuyerSchema } from 'src/users/users.schema';
import { Food, FoodSchema } from 'src/food/schema/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Buyer.name, schema: BuyerSchema },
        { name: Food.name, schema: FoodSchema },
      ]
    )
  ],
  controllers: [BuyersController],
  providers: [BuyersService]
})
export class BuyersModule {}
