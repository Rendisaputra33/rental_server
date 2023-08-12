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
exports.SignInDto = exports.CreateAccountDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAccountDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'nama depan tidak boleh kosong' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'nama belakang tidak boleh kosong' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'alamat tidak boleh kosong' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email harus diisi' }),
    (0, class_validator_1.IsEmail)({}, { message: 'format email salah' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password harus diisi' }),
    (0, class_validator_1.MinLength)(8, { message: 'panjang password minimal 8 karakter' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "password", void 0);
exports.CreateAccountDto = CreateAccountDto;
class SignInDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email harus diisi' }),
    (0, class_validator_1.IsEmail)({}, { message: 'format email salah' }),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password harus diisi' }),
    (0, class_validator_1.MinLength)(8, { message: 'panjang password minimal 8 karakter' }),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
exports.SignInDto = SignInDto;
//# sourceMappingURL=auth.dto.js.map