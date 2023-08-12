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
const prisma_service_1 = require("../../prisma.service");
const common_1 = require("@nestjs/common");
const security = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const security_service_1 = require("../security/security.service");
const duplicate_exception_1 = require("../../errors/duplicate.exception");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, security) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.security = security;
    }
    async getCurrentUser() {
        return await this.prismaService.account.findMany();
    }
    async createAccount(payload) {
        const findEmail = await this.prismaService.account.findUnique({
            where: { email: payload.email },
        });
        if (findEmail != null) {
            throw new duplicate_exception_1.DuplicateException('Email sudah pernah mendaftar');
        }
        const newUser = await this.prismaService.account.create({
            data: {
                full_name: `${payload.first_name} ${payload.last_name}`,
                password: await security.hash(payload.password, 12),
                email: payload.email,
                address: payload.address,
            },
        });
        if (Object.values(newUser).length < 1) {
            throw new common_1.BadRequestException(['error create account']);
        }
        return {
            email: newUser.email,
            name: newUser.full_name,
            address: newUser.address,
        };
    }
    async updateAccount(id, payload) {
        const decId = this.security.decryptId(id);
        const user = await this.prismaService.account.findUnique({
            where: { id: decId },
        });
        const newUser = await this.prismaService.account.update({
            where: { id: decId },
            data: {
                full_name: `${payload.first_name} ${payload.last_name}`,
                password: payload.password == 'defaultt'
                    ? user.password
                    : await security.hash(payload.password, 12),
                email: payload.email,
                address: payload.address,
            },
        });
        if (Object.values(newUser).length < 1) {
            throw new common_1.BadRequestException(['error create account']);
        }
        return {
            email: newUser.email,
            name: newUser.full_name,
            address: newUser.address,
        };
    }
    async signIn({ email, password }) {
        const user = await this.prismaService.account.findUnique({
            where: { email },
        });
        if (user == null) {
            throw new common_1.UnauthorizedException('username/password worng');
        }
        if (!(await security.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('username/password worng');
        }
        const payload = { sub: user.id, name: user.full_name };
        const access_token = await this.jwtService.signAsync(payload);
        await this.prismaService.account.update({
            where: { id: user.id },
            data: { token: access_token },
        });
        delete user.createdAt;
        delete user.password;
        delete user.role;
        delete user.updatedAt;
        delete user.token;
        return Object.assign({ access_token }, user);
    }
    async validateUserById(userId) {
        return this.prismaService.account.findUnique({ where: { id: userId } });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        security_service_1.SecurityService])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map