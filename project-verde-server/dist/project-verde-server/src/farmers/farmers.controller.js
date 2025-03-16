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
exports.FarmersController = void 0;
const common_1 = require("@nestjs/common");
const farmers_service_1 = require("./farmers.service");
const mongoose_1 = require("mongoose");
let FarmersController = class FarmersController {
    constructor(farmersService) {
        this.farmersService = farmersService;
    }
    async findFarmerById(farmerId) {
        return this.farmersService.findFarmerById(farmerId);
    }
    async addToAvailableItems(farmerId, itemId, price) {
        return this.farmersService.addToAvailableItems(farmerId, itemId, price);
    }
    async updateRating(farmerId, rating) {
        return this.farmersService.updateRating(farmerId, rating);
    }
    async getRating(farmerId) {
        return this.farmersService.getRating(farmerId);
    }
};
exports.FarmersController = FarmersController;
__decorate([
    (0, common_1.Get)(':farmerId'),
    __param(0, (0, common_1.Param)('farmerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FarmersController.prototype, "findFarmerById", null);
__decorate([
    (0, common_1.Post)(':farmerId/items/:itemId'),
    __param(0, (0, common_1.Param)('farmerId')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)('price')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId, Number]),
    __metadata("design:returntype", Promise)
], FarmersController.prototype, "addToAvailableItems", null);
__decorate([
    (0, common_1.Patch)(':farmerId/rating'),
    __param(0, (0, common_1.Param)('farmerId')),
    __param(1, (0, common_1.Body)('rating')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FarmersController.prototype, "updateRating", null);
__decorate([
    (0, common_1.Get)(':farmerId/rating'),
    __param(0, (0, common_1.Param)('farmerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FarmersController.prototype, "getRating", null);
exports.FarmersController = FarmersController = __decorate([
    (0, common_1.Controller)('farmers'),
    __metadata("design:paramtypes", [farmers_service_1.FarmersService])
], FarmersController);
//# sourceMappingURL=farmers.controller.js.map