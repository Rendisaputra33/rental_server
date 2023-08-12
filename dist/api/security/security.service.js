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
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let SecurityService = class SecurityService {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.secret = process.env.ID_ENC;
        this.iv = 'ffffffffffffffff';
        this.key = crypto.createHash('sha256').update(this.secret).digest();
    }
    encryptId(id) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(id.toString(), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decryptId(encryptedId) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(encryptedId, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return parseInt(decrypted, 10);
    }
};
SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SecurityService);
exports.SecurityService = SecurityService;
//# sourceMappingURL=security.service.js.map