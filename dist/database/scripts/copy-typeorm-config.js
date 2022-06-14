"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_config_1 = require("../../config/app.config");
const database_config_1 = require("../../config/database.config");
const typeorm_config_service_1 = require("../typeorm-config.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default, app_config_1.default],
                envFilePath: ['.env'],
            }),
        ],
        providers: [typeorm_config_service_1.TypeOrmConfigService],
    })
], AppModule);
const setConfig = async () => {
    const app = await core_1.NestFactory.create(AppModule);
    const typeOrmServiceConfig = app.get(typeorm_config_service_1.TypeOrmConfigService);
    fs.writeFileSync('ormconfig.json', JSON.stringify(typeOrmServiceConfig.createTypeOrmOptions(), null, 2));
    await app.close();
};
void setConfig();
//# sourceMappingURL=copy-typeorm-config.js.map