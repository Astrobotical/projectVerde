import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "../../../interfaces/jwt-payload.interface"
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserCredentials } from "./auth.schema";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(UserCredentials.name) private userCredentialsModel: Model<UserCredentials>,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService

  ) { }

  async register(email: string, password: string): Promise<UserCredentials> {
    if (!(await this.userExistsByEmail(email)).exists) {
      const newUserId = new Types.ObjectId();

      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new this.userCredentialsModel({ _id: newUserId, email, password: hashedPassword });
      return newUser.save();
    }
    throw new BadRequestException('Email already exists');
  }

  async userExistsByEmail(email: string): Promise<{ exists: boolean, userId?: Types.ObjectId }> {
    const existingUser = await this.userCredentialsModel.findOne({ email }).exec();
    return { exists: !!existingUser, userId: existingUser?._id };
  }

  async validateUser(email: string, password: string): Promise<JwtPayload | null> {
    const user = await this.userCredentialsModel.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const userInfo = await this.usersService.findUserById(user._id);

      if (!userInfo) {
        throw new BadRequestException("Please complete registration before attempting to log in");
      }

      const payload: JwtPayload = {
        sub: user._id.toString(),
        email: user.email,
      };

      const optionalFields = ['seekerId', 'ownerId', 'professionalId'];
      optionalFields.forEach(field => {
        if (userInfo[field]) {
          payload[field] = userInfo[field];
        }
      });

      console.log(payload);
      return payload;
    }

    return null;
  }

  async validateUserById(userId: Types.ObjectId): Promise<any> {
    return this.userCredentialsModel.findById(userId).exec();
  }

  async signJwt(user: JwtPayload) {
    const payload = {
      email: user.email,
      sub: user.sub,
    };

    const optionalFields = ['seekerId', 'ownerId', 'professionalId'];
    optionalFields.forEach(field => {
      if (user[field]) {
        payload[field] = user[field];
      }
    });

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '60m',
    });
  }

  async login(user: JwtPayload) {
    const payload = { ...user };

    console.log(user.sub);

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '60m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    };
  }
}
