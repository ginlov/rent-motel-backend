"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformResponseInterceptor = exports.TransformResponse = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
function TransformResponse() {
    return (0, common_1.UseInterceptors)(new TransformResponseInterceptor());
}
exports.TransformResponse = TransformResponse;
class TransformResponseInterceptor {
    intercept(context, handler) {
        return handler.handle().pipe((0, operators_1.map)((data) => {
            return {
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: data.message,
                data: data.data,
            };
        }));
    }
}
exports.TransformResponseInterceptor = TransformResponseInterceptor;
//# sourceMappingURL=transform-response.interceptor.js.map