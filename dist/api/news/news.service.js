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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const security_service_1 = require("../security/security.service");
let NewsService = class NewsService {
    constructor(dbService, security) {
        this.dbService = dbService;
        this.security = security;
    }
    async create({ body, title }) {
        const result = await this.dbService.news.create({
            data: {
                body: body,
                slug: title.split(' ').join('-').toLowerCase(),
                title: title,
                thumbnail: '',
            },
        });
        return result;
    }
    async findAll() {
        return await this.dbService.news.findMany();
    }
    async findOne(identity) {
        const id = this.security.decryptId(identity);
        const result = await this.dbService.news.findUnique({ where: { id } });
        return result;
    }
    async update(identity, { body, title }) {
        const id = this.security.decryptId(identity);
        const result = await this.dbService.news.update({
            where: { id },
            data: {
                body,
                title,
            },
        });
        return result;
    }
    async remove(identity) {
        const id = this.security.decryptId(identity);
        const result = await this.dbService.news.delete({
            where: { id },
        });
        return result != null;
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        security_service_1.SecurityService])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map