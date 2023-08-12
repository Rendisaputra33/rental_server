"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerAdvice = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const multerAdvice = () => ({
    dest: './uploads',
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|heic)$/)) {
            return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
        }
        if (file.size > 2000000) {
            return callback(new common_1.BadRequestException('File size should not exceed 2 MB!'), false);
        }
        callback(null, true);
    },
    storage: (0, multer_1.memoryStorage)(),
});
exports.multerAdvice = multerAdvice;
//# sourceMappingURL=multer.advice.js.map