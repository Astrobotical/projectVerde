import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, UpdateFoodDto } from './food.dto';
import { Food } from './schema/food.schema';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async addFood(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
    return this.foodService.addFood(createFoodDto);
  }

  @Get(':id')
  async findFoodById(@Param('id') foodId: string): Promise<Food> {
    return this.foodService.findFoodById(foodId);
  }

  @Patch(':id')
  async updateFood(
    @Param('id') foodId: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<Food> {
    return this.foodService.updateFood(foodId, updateFoodDto);
  }
}
