import { PrismaService } from './prisma.service';
export declare class AppController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    get(): Promise<{
        total_bike: number;
        total_customer: number;
        total_transaction: number;
        total_revenue: import("@prisma/client/runtime").Decimal;
        transactions: {
            id: number;
            customer: {
                full_name: string;
            };
            package: {
                name: string;
            };
            status: import(".prisma/client").TransactionStatus;
            created_at: Date;
        }[];
        accounts: {
            id: number;
            full_name: string;
            createdAt: Date;
        }[];
    }>;
}
