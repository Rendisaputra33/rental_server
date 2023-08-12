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
exports.BikeController = void 0;
const common_1 = require("@nestjs/common");
const bike_service_1 = require("./bike.service");
const create_bike_dto_1 = require("./dto/create-bike.dto");
const update_bike_dto_1 = require("./dto/update-bike.dto");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const passport_1 = require("@nestjs/passport");
const auth_guard_1 = require("../auth/auth.guard");
const response_1 = require("../../response");
let BikeController = class BikeController {
    constructor(bikeService) {
        this.bikeService = bikeService;
    }
    async getAllBikes() {
        const data = await this.bikeService.getAllBikes();
        return response_1.ApiResponse.build({ data });
    }
    async getBikeById(encryptedId) {
        const data = await this.bikeService.getBikeById(encryptedId);
        return response_1.ApiResponse.build({ data });
    }
    async createBike(payload) {
        const data = await this.bikeService.createBike(payload);
        return response_1.ApiResponse.build({ data });
    }
    async updateBike(encryptedId, payload) {
        const data = await this.bikeService.updateBike(encryptedId, payload);
        return response_1.ApiResponse.build({ data });
    }
    async deleteBike(encryptedId) {
        const data = await this.bikeService.deleteBike(encryptedId);
        return response_1.ApiResponse.build({ data });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getAllBikes", null);
__decorate([
    (0, common_1.Get)(':encryptedId'),
    __param(0, (0, common_1.Param)('encryptedId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "getBikeById", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), auth_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bike_dto_1.CreateBikeDto]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "createBike", null);
__decorate([
    (0, common_1.Patch)(':encryptedId'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), auth_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('encryptedId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bike_dto_1.UpdateBikeDto]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "updateBike", null);
__decorate([
    (0, common_1.Delete)(':encryptedId'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), auth_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('encryptedId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BikeController.prototype, "deleteBike", null);
BikeController = __decorate([
    (0, common_1.Controller)('/api/v1/bike'),
    __metadata("design:paramtypes", [bike_service_1.BikeService])
], BikeController);
exports.BikeController = BikeController;
//# sourceMappingURL=bike.controller.js.map