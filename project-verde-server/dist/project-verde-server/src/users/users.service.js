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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("../auth/auth.service");
let UsersService = class UsersService {
    constructor(userModel, farmerModel, buyerModel, authenticationService) {
        this.userModel = userModel;
        this.farmerModel = farmerModel;
        this.buyerModel = buyerModel;
        this.authenticationService = authenticationService;
    }
    async findAllUsers() {
        return this.userModel.find().exec();
    }
    async findUserById(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
    async createUser(user) {
        const { exists, userId } = await this.authenticationService.userExistsByEmail(user.email);
        if (!exists) {
            throw new common_1.BadRequestException("Please register before creating user");
        }
        user._id = userId.toString();
        const newUser = new this.userModel(user);
        return newUser.save();
    }
    async updateUser(userId, updatedUser) {
        return this.userModel.findByIdAndUpdate(userId, updatedUser, { new: true }).exec();
    }
    async deleteUser(userId) {
        const result = await this.userModel.findByIdAndDelete(userId).exec();
        if (!result) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(users_schema_1.Farmer.name)),
    __param(2, (0, mongoose_1.InjectModel)(users_schema_1.Buyer.name)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthenticationService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        auth_service_1.AuthenticationService])
], UsersService);
//# sourceMappingURL=users.service.js.map