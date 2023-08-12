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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const passport_1 = require("@nestjs/passport");
const auth_guard_1 = require("../auth/auth.guard");
const client_1 = require("@prisma/client");
const response_1 = require("../../response");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let TransactionController = class TransactionController {
    constructor(transactionService, cloudService) {
        this.transactionService = transactionService;
        this.cloudService = cloudService;
    }
    async create(createTransactionDto, request) {
        const customer = request.user.id;
        const data = await this.transactionService.create(Object.assign(Object.assign({}, createTransactionDto), { customer }));
        return response_1.ApiResponse.build({ data, statusCode: 201 });
    }
    async findAll(req, limit, start) {
        const data = await this.transactionService.findAll({
            customer: req.user.role == 'admin' ? undefined : req.user.id,
            start,
            limit,
        });
        return response_1.ApiResponse.build({ data });
    }
    async findOne(id) {
        const data = await this.transactionService.findOne(id);
        return response_1.ApiResponse.build({ data });
    }
    async update(id, { status }) {
        const data = await this.transactionService.updateStatus(id, client_1.TransactionStatus[status]);
        return response_1.ApiResponse.build({ data });
    }
    async remove(id) {
        const data = await this.transactionService.remove(id);
        return response_1.ApiResponse.build({ data });
    }
    async payment(id, file) {
        const { secure_url } = await this.cloudService.uploadFile(file);
        const data = await this.transactionService.checkout(id, secure_url);
        return response_1.ApiResponse.build({ data });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('customer'),
    (0, common_1.UseGuards)(auth_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'customer'),
    (0, common_1.UseGuards)(auth_guard_1.RolesGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('start')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'customer'),
    (0, common_1.UseGuards)(auth_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'customer'),
    (0, common_1.UseGuards)(auth_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(auth_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/:id/checkout'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('transfer_bill')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "payment", null);
TransactionController = __decorate([
    (0, common_1.Controller)('api/v1/transaction'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        cloudinary_service_1.CloudinaryService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map