import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './schema/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Food', schema: FoodSchema },
      ]
    )
  ],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule {}
