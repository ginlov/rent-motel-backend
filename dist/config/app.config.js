"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
}));
//# sourceMappingURL=app.config.js.map