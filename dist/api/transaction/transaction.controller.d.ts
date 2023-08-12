/// <reference types="multer" />
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionStatus } from '@prisma/client';
import { ApiResponse } from '@app/response';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class TransactionController {
    private readonly transactionService;
    private readonly cloudService;
    constructor(transactionService: TransactionService, cloudService: CloudinaryService);
    create(createTransactionDto: CreateTransactionDto, request: any): Promise<ApiResponse<{
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
    }>>;
    findAll(req: any, limit?: string, start?: string): Promise<ApiResponse<{
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
    }[]>>;
    findOne(id: string): Promise<ApiResponse<{
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
            payment_method: import(".prisma/client").PaymentMethod;
            transaction_id: number;
            payment_bill: string;
            is_paid: boolean;
            created_at: Date;
            updated_at: Date;
        }, unknown, never> & {};
        bike: {
            id: number;
        };
    }>>;
    update(id: string, { status }: any): Promise<ApiResponse<boolean>>;
    remove(id: string): Promise<ApiResponse<boolean>>;
    payment(id: string, file: Express.Multer.File): Promise<ApiResponse<boolean>>;
}
