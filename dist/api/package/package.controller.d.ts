import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiResponse } from '@app/response';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    create(createPackageDto: CreatePackageDto): Promise<ApiResponse<import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {}>>;
    findAll(): Promise<ApiResponse<(import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {})[]>>;
    findOne(id: string): Promise<ApiResponse<import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {}>>;
    update(id: string, updatePackageDto: UpdatePackageDto): Promise<ApiResponse<import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {}>>;
    remove(id: string): Promise<ApiResponse<import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {}>>;
}
