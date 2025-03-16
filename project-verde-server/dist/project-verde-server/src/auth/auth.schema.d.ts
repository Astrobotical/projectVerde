import { Document } from 'mongoose';
export type UserCredentialsDocument = UserCredentials & Document;
export declare class UserCredentials {
    email: string;
    password: string;
}
export declare const UserCredentialsSchema: import("mongoose").Schema<UserCredentials, import("mongoose").Model<UserCredentials, any, any, any, Document<unknown, any, UserCredentials> & UserCredentials & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserCredentials, Document<unknown, {}, import("mongoose").FlatRecord<UserCredentials>> & import("mongoose").FlatRecord<UserCredentials> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
