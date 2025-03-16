import { Document } from 'mongoose';
import { FoodCategory } from '../../../../enums/foodCategory.emun';
export type FoodDocument = Food & Document;
export declare class Food {
    _id: string;
    name: string;
    format: string;
    description: string;
    category: FoodCategory;
}
export declare const FoodSchema: import("mongoose").Schema<Food, import("mongoose").Model<Food, any, any, any, Document<unknown, any, Food> & Food & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Food, Document<unknown, {}, import("mongoose").FlatRecord<Food>> & import("mongoose").FlatRecord<Food> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
