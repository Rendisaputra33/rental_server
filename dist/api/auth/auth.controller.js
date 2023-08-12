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
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const response_1 = require("../../response");
const passport_1 = require("@nestjs/passport");
const duplicate_exception_1 = require("../../errors/duplicate.exception");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async getCurrentUser() {
        const data = await this.authService.getCurrentUser();
        return response_1.ApiResponse.build({ data });
    }
    async getLoginnedUser(req) {
        const data = req.user;
        delete data.password;
        return response_1.ApiResponse.build({ data });
    }
    async createNewUser(user) {
        try {
            const data = await this.authService.createAccount(user);
            return response_1.ApiResponse.build({ data });
        }
        catch (error) {
            if (error instanceof duplicate_exception_1.DuplicateException) {
                throw new common_1.BadRequestException([error.message]);
            }
            else {
                throw new common_1.BadRequestException(['Terjadi kesalahan saat mendaftar']);
            }
        }
    }
    async updateUser(user, id) {
        try {
            const data = await this.authService.updateAccount(id, user);
            return response_1.ApiResponse.build({ data });
        }
        catch (error) {
            throw new common_1.BadRequestException(['terjadi kesalahan saat menyimpan']);
        }
    }
    async signInToAccount(request) {
        const data = await this.authService.signIn(request);
        return response_1.ApiResponse.build({ data });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getLoginnedUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createNewUser", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.CreateAccountDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInToAccount", null);
AuthController = __decorate([
    (0, common_1.Controller)('/api/v1/auth'),
    __metadata("design:paramtypes", [auth_service_1.default])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map