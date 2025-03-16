"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const auth_schema_1 = require("./auth.schema");
let AuthenticationService = class AuthenticationService {
    constructor(userCredentialsModel, jwtService, configService, usersService) {
        this.userCredentialsModel = userCredentialsModel;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
    }
    async register(email, password) {
        if (!(await this.userExistsByEmail(email)).exists) {
            const newUserId = new mongoose_2.Types.ObjectId();
            const salt = await bcrypt.genSalt(10);
            console.log(salt);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new this.userCredentialsModel({ _id: newUserId, email, password: hashedPassword });
            return newUser.save();
        }
        throw new common_1.BadRequestException('Email already exists');
    }
    async userExistsByEmail(email) {
        const existingUser = await this.userCredentialsModel.findOne({ email }).exec();
        return { exists: !!existingUser, userId: existingUser?._id };
    }
    async validateUser(email, password) {
        const user = await this.userCredentialsModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const userInfo = await this.usersService.findUserById(user._id);
            if (!userInfo) {
                throw new common_1.BadRequestException("Please complete registration before attempting to log in");
            }
            const payload = {
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
    async validateUserById(userId) {
        return this.userCredentialsModel.findById(userId).exec();
    }
    async signJwt(user) {
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
            secret: this.configService.get('ACCESS_TOKEN_SECRET'),
            expiresIn: '60m',
        });
    }
    async login(user) {
        const payload = { ...user };
        console.log(user.sub);
        return {
            accessToken: this.jwtService.sign(payload, {
                secret: this.configService.get('ACCESS_TOKEN_SECRET'),
                expiresIn: '60m',
            }),
            refreshToken: this.jwtService.sign(payload, {
                secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                expiresIn: '7d',
            }),
        };
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.UserCredentials.name)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService,
        users_service_1.UsersService])
], AuthenticationService);
//# sourceMappingURL=auth.service.js.map