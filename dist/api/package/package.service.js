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
exports.PackageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const security_service_1 = require("../security/security.service");
let PackageService = class PackageService {
    constructor(dbService, security) {
        this.dbService = dbService;
        this.security = security;
    }
    async create(dto) {
        const [startLat, startLong] = dto.start_loc;
        const [destLat, destLong] = dto.destination_loc;
        return await this.dbService.package.create({
            data: {
                code: dto.code,
                name: dto.name,
                price: dto.price,
                description: dto.description,
                lat_start: startLat,
                lngt_start: startLong,
                lat_destination: destLat,
                lngt_destination: destLong,
            },
        });
    }
    async findAll() {
        return await this.dbService.package.findMany();
    }
    async findOne(id) {
        const decid = this.security.decryptId(id);
        return await this.dbService.package.findUnique({
            where: {
                id: decid,
            },
        });
    }
    async update(id, updatePackageDto) {
        const decId = this.security.decryptId(id);
        return await this.dbService.package.update({
            where: {
                id: decId,
            },
            data: {
                name: updatePackageDto.name,
                description: updatePackageDto.description,
                price: updatePackageDto.price,
                lat_start: updatePackageDto.start_loc[0],
                lat_destination: updatePackageDto.destination_loc[0],
                lngt_destination: updatePackageDto.destination_loc[1],
                lngt_start: updatePackageDto.start_loc[1],
            },
        });
    }
    async remove(id) {
        const decId = this.security.decryptId(id);
        return await this.dbService.package.delete({
            where: {
                id: decId,
            },
        });
    }
};
PackageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        security_service_1.SecurityService])
], PackageService);
exports.PackageService = PackageService;
//# sourceMappingURL=package.service.js.map