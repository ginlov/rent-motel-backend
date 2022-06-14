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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const class_transformer_1 = require("class-transformer");
const role_dto_1 = require("../roles/dto/role.dto");
const address_dto_1 = require("../addresses/dto/address.dto");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        return await this.usersRepository.save(this.usersRepository.create(createUserDto));
    }
    async findOne(options, populate = false) {
        let user = await this.usersRepository.findOne(options);
        if (populate) {
            user = await this.usersRepository
                .createQueryBuilder('users')
                .where('users.id = :id', { id: user.id })
                .leftJoinAndSelect('users.addressId', 'addresses')
                .leftJoinAndSelect('users.roleId', 'roles')
                .getOne();
            user['address'] = (0, class_transformer_1.plainToInstance)(address_dto_1.AddressDto, JSON.parse(JSON.stringify(user.addressId)));
            user['role'] = (0, class_transformer_1.plainToInstance)(role_dto_1.RoleDto, JSON.parse(JSON.stringify(user.roleId)));
        }
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map