import { FoodCategory } from '../../../enums/foodCategory.emun';
export declare class CreateFoodDto {
    name: string;
    format: string;
    description: string;
    category: FoodCategory;
}
declare const UpdateFoodDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFoodDto>>;
export declare class UpdateFoodDto extends UpdateFoodDto_base {
}
export {};
