"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./api/auth/auth.module");
const prisma_service_1 = require("./prisma.service");
const bike_module_1 = require("./api/bike/bike.module");
const package_module_1 = require("./api/package/package.module");
const config_1 = require("@nestjs/config");
const security_module_1 = require("./api/security/security.module");
const transaction_module_1 = require("./api/transaction/transaction.module");
const gateway_module_1 = require("./gateways/gateway.module");
const assets_controller_1 = require("./assets.controller");
const cloudinary_module_1 = require("./api/cloudinary/cloudinary.module");
const app_controller_1 = require("./app.controller");
const news_module_1 = require("./api/news/news.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            bike_module_1.BikeModule,
            package_module_1.PackageModule,
            security_module_1.SecurityModule,
            transaction_module_1.TransactionModule,
            gateway_module_1.GatewayModule,
            cloudinary_module_1.CloudinaryModule,
            news_module_1.NewsModule,
        ],
        controllers: [app_controller_1.AppController, assets_controller_1.AssetsController],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map