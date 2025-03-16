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
exports.FoodCatalogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const food_schema_1 = require("../food/schema/food.schema");
const users_schema_1 = require("../users/users.schema");
let FoodCatalogService = class FoodCatalogService {
    constructor(foodModel, farmerModel) {
        this.foodModel = foodModel;
        this.farmerModel = farmerModel;
    }
    async findFoodAvailability(foodName) {
        const food = await this.foodModel.findOne({ name: foodName }).exec();
        if (!food) {
            throw new common_1.NotFoundException(`Food with name '${foodName}' not found`);
        }
        const foodId = food._id.toString();
        this.findAllAvailableFoods(foodId);
    }
    async findAllAvailableFoods(foodId) {
        const availableItems = [];
        const farmers = await this.farmerModel.find({ 'availableItems.itemId': foodId }).exec();
        farmers.forEach(farmer => {
            farmer.availableItems.forEach(item => {
                if (item.itemId.toString() === foodId) {
                    availableItems.push({ itemId: item.itemId, price: item.price });
                }
            });
        });
        return availableItems;
    }
    async findFoodsByCategory(category) {
        const foods = await this.foodModel.find({ category }).exec();
        if (!foods.length) {
            throw new common_1.NotFoundException(`No foods found in category '${category}'`);
        }
        return foods;
    }
};
exports.FoodCatalogService = FoodCatalogService;
exports.FoodCatalogService = FoodCatalogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(food_schema_1.Food.name)),
    __param(1, (0, mongoose_1.InjectModel)(users_schema_1.Farmer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FoodCatalogService);
//# sourceMappingURL=food-catalog.service.js.map