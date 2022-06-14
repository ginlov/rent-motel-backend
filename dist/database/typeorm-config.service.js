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
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let TypeOrmConfigService = class TypeOrmConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    createTypeOrmOptions() {
        return {
            type: this.configService.get('database.type'),
            url: this.configService.get('database.url'),
            host: this.configService.get('database.host'),
            port: this.configService.get('database.port'),
            username: this.configService.get('database.username'),
            password: this.configService.get('database.password'),
            database: this.configService.get('database.name'),
            synchronize: this.configService.get('database.synchronize'),
            dropSchema: false,
            keepConnectionAlive: true,
            logging: this.configService.get('app.nodeEnv') !== 'production',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
            factories: [__dirname + '/factories/**/*{.ts,.js}'],
            cli: {
                entitiesDir: 'src',
                migrationsDir: 'src/database/migrations',
                subscribersDir: 'subscriber',
            },
            extra: {
                max: this.configService.get('database.maxConnections'),
                ssl: this.configService.get('database.sslEnabled')
                    ? {
                        rejectUnauthorized: this.configService.get('database.rejectUnauthorized'),
                        ca: this.configService.get('database.ca')
                            ? this.configService.get('database.ca')
                            : undefined,
                        key: this.configService.get('database.key')
                            ? this.configService.get('database.key')
                            : undefined,
                        cert: this.configService.get('database.cert')
                            ? this.configService.get('database.cert')
                            : undefined,
                    }
                    : undefined,
            },
        };
    }
};
TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeOrmConfigService);
exports.TypeOrmConfigService = TypeOrmConfigService;
//# sourceMappingURL=typeorm-config.service.js.map