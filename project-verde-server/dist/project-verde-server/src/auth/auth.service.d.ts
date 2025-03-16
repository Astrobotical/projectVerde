import { ConfigService } from "@nestjs/config";
import { Model, Types } from "mongoose";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "../../../interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { UserCredentials } from "./auth.schema";
export declare class AuthenticationService {
    private userCredentialsModel;
    private jwtService;
    private configService;
    private readonly usersService;
    constructor(userCredentialsModel: Model<UserCredentials>, jwtService: JwtService, configService: ConfigService, usersService: UsersService);
    register(email: string, password: string): Promise<UserCredentials>;
    userExistsByEmail(email: string): Promise<{
        exists: boolean;
        userId?: Types.ObjectId;
    }>;
    validateUser(email: string, password: string): Promise<JwtPayload | null>;
    validateUserById(userId: Types.ObjectId): Promise<any>;
    signJwt(user: JwtPayload): Promise<string>;
    login(user: JwtPayload): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
