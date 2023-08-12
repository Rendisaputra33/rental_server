"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const prisma_service_1 = require("../../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_strategy_1 = require("./auth.strategy");
const auth_guard_1 = require("./auth.guard");
const security_service_1 = require("../security/security.service");
const privateKey = process.env.SECRET;
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: privateKey,
                signOptions: {
                    expiresIn: '2 days',
                },
            }),
        ],
        controllers: [auth_controller_1.default],
        providers: [
            prisma_service_1.PrismaService,
            security_service_1.SecurityService,
            auth_service_1.default,
            auth_strategy_1.AuthStrategy,
            auth_guard_1.RolesGuard,
        ],
        exports: [auth_strategy_1.AuthStrategy, passport_1.PassportModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map