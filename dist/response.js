"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor({ statusCode, message, data }) {
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 200;
        this.message = message !== null && message !== void 0 ? message : 'Success';
        this.data = data !== null && data !== void 0 ? data : undefined;
    }
    static build(data) {
        return new ApiResponse(data);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=response.js.map