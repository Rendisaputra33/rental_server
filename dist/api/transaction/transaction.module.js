"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const transaction_controller_1 = require("./transaction.controller");
const prisma_service_1 = require("../../prisma.service");
const auth_guard_1 = require("../auth/auth.guard");
const security_service_1 = require("../security/security.service");
const gateway_service_1 = require("../../gateways/gateway.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_advice_1 = require("../../advice/multer.advice");
const security_module_1 = require("../security/security.module");
const gateway_1 = require("../../gateways/gateway");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let TransactionModule = class TransactionModule {
};
TransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                imports: [security_module_1.SecurityModule],
                useFactory: multer_advice_1.multerAdvice,
            }),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [transaction_controller_1.TransactionController],
        providers: [
            gateway_1.GatewayGateway,
            prisma_service_1.PrismaService,
            security_service_1.SecurityService,
            gateway_service_1.SocketService,
            transaction_service_1.TransactionService,
            auth_guard_1.RolesGuard,
        ],
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map