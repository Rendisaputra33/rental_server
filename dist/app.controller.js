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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let AppController = class AppController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get() {
        const totalBike = await this.prisma.bike.count();
        const totalCustomer = await this.prisma.account.count({
            where: { role: 'customer' },
        });
        const totalTransaction = await this.prisma.transaction.count();
        const { _sum: { ammount }, } = await this.prisma.transaction.aggregate({
            _sum: {
                ammount: true,
            },
            where: {
                status: 'COMPLETED',
            },
        });
        const transactions = await this.prisma.transaction.findMany({
            select: {
                id: true,
                customer: { select: { full_name: true } },
                package: { select: { name: true } },
                status: true,
                created_at: true,
            },
            take: 6,
            orderBy: {
                id: 'desc',
            },
        });
        const accounts = await this.prisma.account.findMany({
            select: {
                id: true,
                full_name: true,
                createdAt: true,
            },
            take: 6,
            orderBy: {
                id: 'desc',
            },
            where: { role: 'customer' },
        });
        return {
            total_bike: totalBike,
            total_customer: totalCustomer,
            total_transaction: totalTransaction,
            total_revenue: ammount,
            transactions,
            accounts,
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "get", null);
AppController = __decorate([
    (0, common_1.Controller)('/api/v1/overview'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map