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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerSchema = exports.Buyer = exports.FarmerSchema = exports.Farmer = exports.UserSchema = exports.User = exports.AvailableItemSchema = exports.AvailableItem = exports.CoordinatesSchema = exports.Coordinates = exports.NameSchema = exports.Name = exports.Rating = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const food_schema_1 = require("../food/schema/food.schema");
let Rating = class Rating {
};
exports.Rating = Rating;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Rating.prototype, "raters", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Rating.prototype, "totalRating", void 0);
exports.Rating = Rating = __decorate([
    (0, mongoose_1.Schema)()
], Rating);
let Name = class Name {
};
exports.Name = Name;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Name.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Name.prototype, "lastName", void 0);
exports.Name = Name = __decorate([
    (0, mongoose_1.Schema)()
], Name);
exports.NameSchema = mongoose_1.SchemaFactory.createForClass(Name);
let Coordinates = class Coordinates {
};
exports.Coordinates = Coordinates;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Coordinates.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Coordinates.prototype, "longitude", void 0);
exports.Coordinates = Coordinates = __decorate([
    (0, mongoose_1.Schema)()
], Coordinates);
exports.CoordinatesSchema = mongoose_1.SchemaFactory.createForClass(Coordinates);
let AvailableItem = class AvailableItem {
};
exports.AvailableItem = AvailableItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: food_schema_1.Food.name, required: true }),
    __metadata("design:type", String)
], AvailableItem.prototype, "itemId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], AvailableItem.prototype, "price", void 0);
exports.AvailableItem = AvailableItem = __decorate([
    (0, mongoose_1.Schema)()
], AvailableItem);
exports.AvailableItemSchema = mongoose_1.SchemaFactory.createForClass(AvailableItem);
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Name)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.CoordinatesSchema, required: true }),
    __metadata("design:type", Coordinates)
], User.prototype, "coordinates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "walletBalance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['Farmer', 'Buyer'] }),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ discriminatorKey: 'userType' })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
let Farmer = class Farmer extends User {
};
exports.Farmer = Farmer;
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Rating)
], Farmer.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.AvailableItemSchema], default: [] }),
    __metadata("design:type", Array)
], Farmer.prototype, "availableItems", void 0);
exports.Farmer = Farmer = __decorate([
    (0, mongoose_1.Schema)()
], Farmer);
exports.FarmerSchema = mongoose_1.SchemaFactory.createForClass(Farmer);
let Buyer = class Buyer extends User {
};
exports.Buyer = Buyer;
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: food_schema_1.Food.name }], default: [] }),
    __metadata("design:type", Array)
], Buyer.prototype, "favoriteFoods", void 0);
exports.Buyer = Buyer = __decorate([
    (0, mongoose_1.Schema)()
], Buyer);
exports.BuyerSchema = mongoose_1.SchemaFactory.createForClass(Buyer);
//# sourceMappingURL=users.schema.js.map