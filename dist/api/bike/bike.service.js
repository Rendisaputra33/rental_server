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
exports.BikeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const security_service_1 = require("../security/security.service");
let BikeService = class BikeService {
    constructor(prisma, cryptoService) {
        this.prisma = prisma;
        this.cryptoService = cryptoService;
    }
    async getAllBikes() {
        return this.prisma.bike.findMany();
    }
    async getBikeById(encryptedId) {
        const id = this.cryptoService.decryptId(encryptedId);
        return this.prisma.bike.findUnique({ where: { id } });
    }
    async createBike(data) {
        return this.prisma.bike.create({
            data: {
                code: data.code,
                name: data.name,
                available: data.available,
                image: data.image,
            },
        });
    }
    async updateBike(encryptedId, data) {
        const id = this.cryptoService.decryptId(encryptedId);
        return this.prisma.bike.update({ where: { id }, data });
    }
    async deleteBike(encryptedId) {
        const id = this.cryptoService.decryptId(encryptedId);
        await this.prisma.bike.delete({ where: { id } });
        return true;
    }
};
BikeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        security_service_1.SecurityService])
], BikeService);
exports.BikeService = BikeService;
//# sourceMappingURL=bike.service.js.map