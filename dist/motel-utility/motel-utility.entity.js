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
exports.MotelUtility = void 0;
const typeorm_1 = require("typeorm");
const motel_entity_1 = require("../motels/motel.entity");
const utility_entity_1 = require("../utilities/utility.entity");
let MotelUtility = class MotelUtility {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MotelUtility.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'motel_id' }),
    (0, typeorm_1.OneToOne)((type) => motel_entity_1.Motel),
    __metadata("design:type", String)
], MotelUtility.prototype, "motelId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'utility_id' }),
    (0, typeorm_1.OneToOne)((type) => utility_entity_1.Utility),
    __metadata("design:type", String)
], MotelUtility.prototype, "utilityId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MotelUtility.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MotelUtility.prototype, "updatedAt", void 0);
MotelUtility = __decorate([
    (0, typeorm_1.Entity)('motel_utility')
], MotelUtility);
exports.MotelUtility = MotelUtility;
//# sourceMappingURL=motel-utility.entity.js.map