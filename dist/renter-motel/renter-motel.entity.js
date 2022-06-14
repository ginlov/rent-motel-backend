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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const motel_entity_1 = require("../motels/motel.entity");
const user_entity_1 = require("../users/user.entity");
let Role = class Role {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'renter_id' }),
    (0, typeorm_1.OneToOne)((type) => user_entity_1.User),
    __metadata("design:type", String)
], Role.prototype, "renterId", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'motel_id' }),
    (0, typeorm_1.OneToOne)((type) => motel_entity_1.Motel),
    __metadata("design:type", String)
], Role.prototype, "motelId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'start_date' }),
    __metadata("design:type", Date)
], Role.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'end_date' }),
    __metadata("design:type", Date)
], Role.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Role.prototype, "deposit", void 0);
Role = __decorate([
    (0, typeorm_1.Entity)('renter_motel')
], Role);
exports.Role = Role;
//# sourceMappingURL=renter-motel.entity.js.map