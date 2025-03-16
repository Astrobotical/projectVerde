import { Module } from '@nestjs/common';
import { FoodCatalogController } from './food-catalog.controller';
import { FoodCatalogService } from './food-catalog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from 'src/food/schema/food.schema';
import { Farmer, FarmerSchema } from 'src/users/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Food.name, schema: FoodSchema },
        { name: Farmer.name, schema: FarmerSchema },
      ]
    )
  ],
  controllers: [FoodCatalogController],
  providers: [FoodCatalogService]
})
export class FoodCatalogModule {}
