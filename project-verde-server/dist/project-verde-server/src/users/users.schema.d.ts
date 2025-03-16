import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare class Rating {
    raters: number;
    totalRating: number;
}
export declare class Name {
    firstName: string;
    lastName: string;
}
export declare const NameSchema: import("mongoose").Schema<Name, import("mongoose").Model<Name, any, any, any, Document<unknown, any, Name> & Name & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Name, Document<unknown, {}, import("mongoose").FlatRecord<Name>> & import("mongoose").FlatRecord<Name> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Coordinates {
    latitude: number;
    longitude: number;
}
export declare const CoordinatesSchema: import("mongoose").Schema<Coordinates, import("mongoose").Model<Coordinates, any, any, any, Document<unknown, any, Coordinates> & Coordinates & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Coordinates, Document<unknown, {}, import("mongoose").FlatRecord<Coordinates>> & import("mongoose").FlatRecord<Coordinates> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class AvailableItem {
    itemId: string;
    price: number;
}
export declare const AvailableItemSchema: import("mongoose").Schema<AvailableItem, import("mongoose").Model<AvailableItem, any, any, any, Document<unknown, any, AvailableItem> & AvailableItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AvailableItem, Document<unknown, {}, import("mongoose").FlatRecord<AvailableItem>> & import("mongoose").FlatRecord<AvailableItem> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class User {
    _id: string;
    email: string;
    name: Name;
    coordinates: Coordinates;
    walletBalance: number;
    userType: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type FarmerDocument = Farmer & Document;
export declare class Farmer extends User {
    rating: Rating;
    availableItems: AvailableItem[];
}
export declare const FarmerSchema: import("mongoose").Schema<Farmer, import("mongoose").Model<Farmer, any, any, any, Document<unknown, any, Farmer> & Farmer & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Farmer, Document<unknown, {}, import("mongoose").FlatRecord<Farmer>> & import("mongoose").FlatRecord<Farmer> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export type BuyerDocument = Buyer & Document;
export declare class Buyer extends User {
    favoriteFoods: Types.ObjectId[];
}
export declare const BuyerSchema: import("mongoose").Schema<Buyer, import("mongoose").Model<Buyer, any, any, any, Document<unknown, any, Buyer> & Buyer & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Buyer, Document<unknown, {}, import("mongoose").FlatRecord<Buyer>> & import("mongoose").FlatRecord<Buyer> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
