"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodCatalogModule = void 0;
const common_1 = require("@nestjs/common");
const food_catalog_controller_1 = require("./food-catalog.controller");
const food_catalog_service_1 = require("./food-catalog.service");
let FoodCatalogModule = class FoodCatalogModule {
};
exports.FoodCatalogModule = FoodCatalogModule;
exports.FoodCatalogModule = FoodCatalogModule = __decorate([
    (0, common_1.Module)({
        controllers: [food_catalog_controller_1.FoodCatalogController],
        providers: [food_catalog_service_1.FoodCatalogService]
    })
], FoodCatalogModule);
//# sourceMappingURL=food-catalog.module.js.map