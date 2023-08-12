import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '@app/api/security/security.service';
import { PaymentMethod, TransactionStatus } from '@prisma/client';
import { GatewayGateway } from '@app/gateways/gateway';
type FilterAll = {
    customer?: number;
    limit?: string;
    start?: string;
};
export declare class TransactionService {
    private readonly dbService;
    private readonly security;
    private readonly gate;
    constructor(dbService: PrismaService, security: SecurityService, gate: GatewayGateway);
    create({ customer, packages, bike, ...input }: CreateTransactionDto): Promise<{
        id: number;
        updated_at: Date;
        created_at: Date;
        customer: {
            id: number;
            full_name: string;
            role: import(".prisma/client").RoleAccount;
        };
        package: import("@prisma/client/runtime").GetResult<{
            id: number;
            code: string;
            name: string;
            description: string;
            price: import("@prisma/client/runtime").Decimal;
            lat_start: import("@prisma/client/runtime").Decimal;
            lngt_start: import("@prisma/client/runtime").Decimal;
            lat_destination: import("@prisma/client/runtime").Decimal;
            lngt_destination: import("@prisma/client/runtime").Decimal;
        }, unknown, never> & {};
        status: TransactionStatus;
        code: string;
        payment: {
            payment_bill: string;
        };
        bike: {
            id: number;
        };
    }>;
    createTransactionCode(): Promise<number>;
    findAll({ customer, limit, start }: FilterAll): Promise<{
        id: number;
        updated_at: Date;
        created_at: Date;
        customer: {
            id: number;
            full_name: string;
            role: import(".prisma/client").RoleAccount;
        };
        package: import("@prisma/client/runtime").GetResult<{
            id: number;
            code: string;
            name: string;
            description: string;
            price: import("@prisma/client/runtime").Decimal;
            lat_start: import("@prisma/client/runtime").Decimal;
            lngt_start: import("@prisma/client/runtime").Decimal;
            lat_destination: import("@prisma/client/runtime").Decimal;
            lngt_destination: import("@prisma/client/runtime").Decimal;
        }, unknown, never> & {};
        status: TransactionStatus;
        code: string;
        payment: {
            payment_bill: string;
        };
        bike: {
            id: number;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        status: TransactionStatus;
        updated_at: Date;
        created_at: Date;
        code: string;
        customer: {
            id: number;
            full_name: string;
            role: import(".prisma/client").RoleAccount;
        };
        package: import("@prisma/client/runtime").GetResult<{
            id: number;
            code: string;
            name: string;
            description: string;
            price: import("@prisma/client/runtime").Decimal;
            lat_start: import("@prisma/client/runtime").Decimal;
            lngt_start: import("@prisma/client/runtime").Decimal;
            lat_destination: import("@prisma/client/runtime").Decimal;
            lngt_destination: import("@prisma/client/runtime").Decimal;
        }, unknown, never> & {};
        payment: import("@prisma/client/runtime").GetResult<{
            id: number;
            payment_method: PaymentMethod;
            transaction_id: number;
            payment_bill: string;
            is_paid: boolean;
            created_at: Date;
            updated_at: Date;
        }, unknown, never> & {};
        bike: {
            id: number;
        };
    }>;
    updateStatus(id: string, status: TransactionStatus): Promise<boolean>;
    remove(id: string): Promise<boolean>;
    checkout(id: string, tranferBill: string): Promise<boolean>;
}
export {};
