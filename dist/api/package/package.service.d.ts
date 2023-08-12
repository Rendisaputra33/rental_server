import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';
export declare class PackageService {
    private readonly dbService;
    private readonly security;
    constructor(dbService: PrismaService, security: SecurityService);
    create(dto: CreatePackageDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {})[]>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {}>;
    update(id: string, updatePackageDto: UpdatePackageDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        code: string;
        name: string;
        description: string;
        price: import("@prisma/client/runtime").Decimal;
        lat_start: import("@prisma/client/runtime").Decimal;
        lngt_start: import("@prisma/client/runtime").Decimal;
        lat_destination: import("@prisma/client/runtime").Decimal;
        lngt_destination: import("@prisma/client/runtime").Decimal;
    }, unknown, never> & {}>;
}
