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
exports.CreatePackageDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePackageDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Kode paket tidak boleh kosong',
    }),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Nama paket tidak boleh kosong',
    }),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Deskripsi paket tidak boleh kosong',
    }),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.Min)(30000, {
        message: 'Harga minimal Rp. 30.000',
    }),
    __metadata("design:type", Number)
], CreatePackageDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Lokasi awal tidak boleh kosong',
    }),
    __metadata("design:type", Array)
], CreatePackageDto.prototype, "start_loc", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Lokasi awal tidak boleh kosong',
    }),
    __metadata("design:type", Array)
], CreatePackageDto.prototype, "destination_loc", void 0);
exports.CreatePackageDto = CreatePackageDto;
//# sourceMappingURL=create-package.dto.js.map