import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('/api/v1/overview')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async get() {
    const totalBike = await this.prisma.bike.count();
    const totalCustomer = await this.prisma.account.count({
      where: { role: 'customer' },
    });
    const totalTransaction = await this.prisma.transaction.count();
    const {
      _sum: { ammount },
    } = await this.prisma.transaction.aggregate({
      _sum: {
        ammount: true,
      },
      where: {
        status: 'COMPLETED',
      },
    });

    const transactions = await this.prisma.transaction.findMany({
      select: {
        id: true,
        customer: { select: { full_name: true } },
        package: { select: { name: true } },
        status: true,
        created_at: true,
      },
      take: 6,
      orderBy: {
        id: 'desc',
      },
    });

    const accounts = await this.prisma.account.findMany({
      select: {
        id: true,
        full_name: true,
        createdAt: true,
      },
      take: 6,
      orderBy: {
        id: 'desc',
      },
      where: { role: 'customer' },
    });

    return {
      total_bike: totalBike,
      total_customer: totalCustomer,
      total_transaction: totalTransaction,
      total_revenue: ammount,
      transactions,
      accounts,
    };
  }
}
