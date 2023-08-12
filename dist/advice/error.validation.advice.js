"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidationAdvice = void 0;
const common_1 = require("@nestjs/common");
const errorValidationAdvice = (errors) => {
    const err = {
        statusCode: 400,
        error: 'Bad Request',
        messages: {},
    };
    errors.forEach((e) => {
        err.messages[e.property] = Object.values(e.constraints);
    });
    return new common_1.BadRequestException(err);
};
exports.errorValidationAdvice = errorValidationAdvice;
//# sourceMappingURL=error.validation.advice.js.map