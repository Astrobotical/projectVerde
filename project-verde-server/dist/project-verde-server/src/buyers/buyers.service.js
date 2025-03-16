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
exports.BuyersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const food_schema_1 = require("../food/schema/food.schema");
const users_schema_1 = require("../users/users.schema");
let BuyersService = class BuyersService {
    constructor(buyerModel, foodModel) {
        this.buyerModel = buyerModel;
        this.foodModel = foodModel;
    }
    async addToFavorites(buyerId, foodId) {
        const buyer = await this.buyerModel.findById(buyerId).exec();
        if (!buyer) {
            throw new common_1.NotFoundException(`Buyer with ID '${buyerId}' not found`);
        }
        const food = await this.foodModel.findById(foodId).exec();
        if (!food) {
            throw new common_1.NotFoundException(`Food with ID '${foodId}' not found`);
        }
        if (!buyer.favoriteFoods.includes(foodId)) {
            buyer.favoriteFoods.push(foodId);
            await buyer.save();
        }
        return buyer;
    }
    async removeFromFavorites(buyerId, foodId) {
        const buyer = await this.buyerModel.findById(buyerId).exec();
        if (!buyer) {
            throw new common_1.NotFoundException(`Buyer with ID '${buyerId}' not found`);
        }
        buyer.favoriteFoods = buyer.favoriteFoods.filter(id => id !== foodId);
        await buyer.save();
        return buyer;
    }
};
exports.BuyersService = BuyersService;
exports.BuyersService = BuyersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.Buyer.name)),
    __param(1, (0, mongoose_1.InjectModel)(food_schema_1.Food.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BuyersService);
//# sourceMappingURL=buyers.service.js.map