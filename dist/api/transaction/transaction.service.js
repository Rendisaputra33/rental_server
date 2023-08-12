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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const security_service_1 = require("../security/security.service");
const client_1 = require("@prisma/client");
const gateway_1 = require("../../gateways/gateway");
const CASH_LINK = 'https://res.cloudinary.com/dwkxhn2jg/image/upload/v1690407966/cash_tlpf8z.png';
let TransactionService = class TransactionService {
    constructor(dbService, security, gate) {
        this.dbService = dbService;
        this.security = security;
        this.gate = gate;
    }
    async create(_a) {
        var { customer, packages, bike } = _a, input = __rest(_a, ["customer", "packages", "bike"]);
        console.log({ bike, packages, customer });
        const customerData = await this.dbService.account.findUnique({
            where: { id: customer },
        });
        const packageData = await this.dbService.package.findUnique({
            where: { id: packages },
        });
        const bikeSelected = await this.dbService.bike.findUnique({
            where: { id: bike },
        });
        const queue = await this.createTransactionCode();
        const data = await this.dbService.transaction.create({
            data: {
                account_id: customerData.id,
                package_id: packageData.id,
                code: 'TRC-' + (isNaN(queue) ? 1 : queue),
                bike_id: bikeSelected.id,
                ammount: packageData.price,
                status: client_1.TransactionStatus.PENDING,
                payment: {
                    create: {
                        is_paid: false,
                        payment_bill: input.payment_method == 'CASH' ? CASH_LINK : null,
                        payment_method: client_1.PaymentMethod[input.payment_method],
                    },
                },
            },
            select: {
                id: true,
                updated_at: true,
                created_at: true,
                customer: {
                    select: {
                        id: true,
                        full_name: true,
                        role: true,
                    },
                },
                package: true,
                status: true,
                code: true,
                payment: {
                    select: {
                        payment_bill: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        return data;
    }
    async createTransactionCode() {
        var _a;
        const data = await this.dbService.transaction.findFirst({
            select: { id: true },
            orderBy: { id: 'desc' },
        });
        return (_a = (data === null || data === void 0 ? void 0 : data.id) + 1) !== null && _a !== void 0 ? _a : 1;
    }
    async findAll({ customer, limit, start }) {
        const filter = customer == undefined ? undefined : { where: { account_id: customer } };
        const paginate = {};
        if (limit != undefined && start != undefined) {
            paginate['take'] = parseInt(limit);
            paginate['skip'] = parseInt(start);
        }
        return this.dbService.transaction.findMany(Object.assign(Object.assign(Object.assign({ select: {
                id: true,
                updated_at: true,
                created_at: true,
                customer: {
                    select: {
                        id: true,
                        full_name: true,
                        role: true,
                    },
                },
                package: true,
                status: true,
                code: true,
                payment: {
                    select: {
                        payment_bill: true,
                    },
                },
                bike: {
                    select: {
                        id: true,
                    },
                },
            } }, filter), { orderBy: {
                id: 'desc',
            } }), paginate));
    }
    async findOne(id) {
        const decId = this.security.decryptId(id);
        return this.dbService.transaction.findUnique({
            where: { id: decId },
            select: {
                id: true,
                status: true,
                updated_at: true,
                created_at: true,
                code: true,
                customer: {
                    select: {
                        id: true,
                        full_name: true,
                        role: true,
                    },
                },
                package: true,
                payment: true,
                bike: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    }
    async updateStatus(id, status) {
        const decId = this.security.decryptId(id);
        const result = await this.dbService.transaction.update({
            where: { id: decId },
            data: { status: status },
        });
        this.gate.server.emit('on_change_status_order', {
            status: result.status,
            code: result.code,
        });
        return result != null;
    }
    async remove(id) {
        const decId = this.security.decryptId(id);
        const result = await this.dbService.transaction.update({
            where: { id: decId },
            data: { status: client_1.TransactionStatus.REJECTED },
        });
        return result != null;
    }
    async checkout(id, tranferBill) {
        const decId = this.security.decryptId(id);
        const result = await this.dbService.transaction.update({
            where: { id: decId },
            data: {
                payment: {
                    update: {
                        is_paid: true,
                        payment_bill: tranferBill,
                    },
                },
            },
        });
        return result != null;
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        security_service_1.SecurityService,
        gateway_1.GatewayGateway])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map