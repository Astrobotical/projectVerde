import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { FoodCategory } from "../../../enums/foodCategory.emun";
import { Food } from "src/food/schema/food.schema";
import { FoodCatalogService } from "./food-catalog.service";

@Controller('food-catalog')
export class FoodCatalogController {
  constructor(private readonly foodCatalogService: FoodCatalogService) {}

  @Get('availability/:foodName')
  async findFoodAvailability(@Param('foodName') foodName: string) {
    return this.foodCatalogService.findFoodAvailability(foodName);
  }

  @Get('available/:foodId')
  async findAllAvailableFoods(@Param('foodId') foodId: string) {
    return this.foodCatalogService.findAllAvailableFoods(foodId);
  }

  @Get('category')
  async findFoodsByCategory(@Query('category') category: FoodCategory): Promise<Food[]> {
    if (!category) {
      throw new NotFoundException('Category query parameter is required');
    }
    return this.foodCatalogService.findFoodsByCategory(category);
  }
}