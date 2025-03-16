import { FoodService } from './food.service';
import { CreateFoodDto, UpdateFoodDto } from './food.dto';
import { Food } from './schema/food.schema';
export declare class FoodController {
    private readonly foodService;
    constructor(foodService: FoodService);
    addFood(createFoodDto: CreateFoodDto): Promise<Food>;
    findFoodById(foodId: string): Promise<Food>;
    updateFood(foodId: string, updateFoodDto: UpdateFoodDto): Promise<Food>;
}
