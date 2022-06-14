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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const addresses_service_1 = require("../addresses/addresses.service");
const roles_service_1 = require("../roles/roles.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, rolesService, addressesService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.rolesService = rolesService;
        this.addressesService = addressesService;
    }
    async register(userRegisterData) {
        const userExisted = await this.usersService.findOne({
            where: {
                email: userRegisterData.email,
            },
        });
        if (userExisted) {
            throw new common_1.ConflictException('Email in use.');
        }
        const address = await this.addressesService.create({
            city: userRegisterData.city,
            district: userRegisterData.district,
            ward: userRegisterData.ward,
            detail: userRegisterData.detail,
        });
        const role = await this.rolesService.findOne({
            where: {
                name: userRegisterData.role,
            },
        });
        const hashedPassword = await bcrypt.hash(userRegisterData.password, 12);
        userRegisterData.password = hashedPassword;
        return await this.usersService.create(Object.assign(Object.assign({}, userRegisterData), { roleId: role.id, addressId: address.id }));
    }
    async login(userLoginData) {
        const user = await this.usersService.findOne({
            where: {
                email: userLoginData.email,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Account does not exist.');
        }
        if (!(await bcrypt.compare(userLoginData.password, user.password)))
            throw new common_1.UnauthorizedException('Invalid password.');
        const token = this.jwtService.sign({
            id: user.id,
        });
        return {
            accessToken: token,
            expiresIn: this.configService.get('auth.expires'),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        roles_service_1.RolesService,
        addresses_service_1.AddressesService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map