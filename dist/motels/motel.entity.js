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
exports.Motel = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("../addresses/address.entity");
let Motel = class Motel {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Motel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Motel.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'address_id' }),
    (0, typeorm_1.OneToOne)((type) => address_entity_1.Address),
    __metadata("design:type", String)
], Motel.prototype, "addressId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'water_price' }),
    __metadata("design:type", Number)
], Motel.prototype, "waterPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'electric_price' }),
    __metadata("design:type", Number)
], Motel.prototype, "electricPrice", void 0);
Motel = __decorate([
    (0, typeorm_1.Entity)('motels')
], Motel);
exports.Motel = Motel;
//# sourceMappingURL=motel.entity.js.map