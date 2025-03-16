import { Name } from './users.schema';
import { Coordinates } from '../users/users.schema';
export declare class CreateUserDto {
    _id: string;
    name: Name;
    email: string;
    coordinates: Coordinates;
    walletBalance: number;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
