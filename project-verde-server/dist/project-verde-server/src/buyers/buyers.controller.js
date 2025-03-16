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
exports.BuyersController = void 0;
const common_1 = require("@nestjs/common");
const buyers_service_1 = require("./buyers.service");
const mongoose_1 = require("mongoose");
let BuyersController = class BuyersController {
    constructor(buyersService) {
        this.buyersService = buyersService;
    }
    async addToFavorites(userId, foodId) {
        return this.buyersService.addToFavorites(userId, foodId);
    }
    async removeFromFavorites(buyerId, foodId) {
        return this.buyersService.removeFromFavorites(buyerId, foodId);
    }
};
exports.BuyersController = BuyersController;
__decorate([
    (0, common_1.Post)(':userId/favorites/:foodId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('foodId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], BuyersController.prototype, "addToFavorites", null);
__decorate([
    (0, common_1.Delete)(':userId/favorites/:foodId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('foodId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], BuyersController.prototype, "removeFromFavorites", null);
exports.BuyersController = BuyersController = __decorate([
    (0, common_1.Controller)('buyers'),
    __metadata("design:paramtypes", [buyers_service_1.BuyersService])
], BuyersController);
//# sourceMappingURL=buyers.controller.js.map