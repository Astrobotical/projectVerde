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
exports.FarmersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("../auth/auth.service");
const users_service_1 = require("../users/users.service");
const users_schema_1 = require("../users/users.schema");
let FarmersService = class FarmersService {
    constructor(farmerModel, usersService, authenticationService) {
        this.farmerModel = farmerModel;
        this.usersService = usersService;
        this.authenticationService = authenticationService;
    }
    async findFarmerById(farmerId) {
        const farmer = await this.farmerModel.findOne({ farmerId }).exec();
        if (!farmer) {
            throw new common_1.NotFoundException(`Farmer with ID ${farmerId} not found`);
        }
        const user = await this.usersService.findUserById(new mongoose_2.Types.ObjectId(farmer._id));
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${farmer._id} not found`);
        }
        return { farmer, user };
    }
    async updateFarmer(farmerId, updatedFarmer) {
        const farmer = await this.farmerModel.findOneAndUpdate({ farmerId }, updatedFarmer, { new: true }).exec();
        if (!farmer) {
            throw new common_1.NotFoundException(`Farmer with ID ${farmerId} not found`);
        }
        return farmer;
    }
    async addToAvailableItems(farmerId, itemId, price) {
        await this.farmerModel.findOneAndUpdate({ farmerId }, {
            $push: {
                availableItems: {
                    itemId,
                    price: price,
                },
            },
        }, { new: true }).exec();
    }
    async removeFromAvailableItems(farmerId, itemId) {
        const farmer = await this.farmerModel.findOne({ farmerId }).exec();
        if (!farmer) {
            throw new common_1.NotFoundException(`Farmer with ID ${farmerId} not found`);
        }
        const item = farmer.availableItems.find((item) => item.itemId.toString() === itemId.toString());
        if (!item) {
            throw new common_1.NotFoundException(`Item with ID ${itemId} not found in farmer's available items`);
        }
        await farmer.save();
    }
    async updateRating(userId, newRating) {
        const farmer = await this.farmerModel.findById(userId).exec();
        if (!farmer) {
            throw new common_1.NotFoundException(`Farmer with ID ${userId} not found`);
        }
        farmer.rating.totalRating += newRating;
        farmer.rating.raters += 1;
        await farmer.save();
    }
    async getRating(userId) {
        const farmer = await this.farmerModel.findById(userId).exec();
        if (!farmer) {
            throw new common_1.NotFoundException(`Farmer with ID ${userId} not found`);
        }
        if (farmer.rating.raters === 0) {
            return 0;
        }
        return farmer.rating.totalRating / farmer.rating.raters;
    }
};
exports.FarmersService = FarmersService;
exports.FarmersService = FarmersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.Farmer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        auth_service_1.AuthenticationService])
], FarmersService);
//# sourceMappingURL=farmers.service.js.map