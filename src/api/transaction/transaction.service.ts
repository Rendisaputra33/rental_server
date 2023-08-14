import { Injectable } from '@nestjs/common';
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

const CASH_LINK =
  'https://res.cloudinary.com/dwkxhn2jg/image/upload/v1690407966/cash_tlpf8z.png';

@Injectable()
export class TransactionService {
  /**
   * service registor
   * @param dbService
   */
  constructor(
    private readonly dbService: PrismaService,
    private readonly security: SecurityService,
    private readonly gate: GatewayGateway,
  ) { }

  async create({ customer, packages, bike, ...input }: CreateTransactionDto) {
    console.log({ bike, packages, customer });
    const customerData = await this.dbService.account.findUnique({
      where: { id: customer },
    });

    const packageData = await this.dbService.package.findUnique({
      where: { id: packages },
    });

    const bikeSelected = await this.dbService.bike.findUnique({
      where: { id: bike },
    });

    const queue = await this.createTransactionCode();

    const data = await this.dbService.transaction.create({
      data: {
        account_id: customerData.id,
        package_id: packageData.id,
        code: 'TRC-' + (isNaN(queue) ? 1 : queue),
        bike_id: bikeSelected.id,
        ammount: packageData.price,
        status: TransactionStatus.PENDING,
        payment: {
          create: {
            is_paid: false,
            payment_bill: input.payment_method == 'CASH' ? CASH_LINK : null,
            payment_method: PaymentMethod[input.payment_method],
          },
        },
      },
      select: {
        id: true,
        updated_at: true,
        created_at: true,
        customer: {
          select: {
            id: true,
            full_name: true,
            role: true,
          },
        },
        package: true,
        status: true,
        code: true,
        payment: {
          select: {
            payment_bill: true,
          },
        },
        bike: {
          select: {
            id: true,
          },
        },
      },
    });

    return data;
  }

  async createTransactionCode() {
    const data = await this.dbService.transaction.findFirst({
      select: { id: true },
      orderBy: { id: 'desc' },
    });

    return data?.id + 1 ?? 1;
  }

  async findAll({ customer, limit, start }: FilterAll) {
    const filter =
      customer == undefined ? undefined : { where: { account_id: customer } };

    const paginate = {};

    if (limit != undefined && start != undefined) {
      paginate['take'] = parseInt(limit);
      paginate['skip'] = parseInt(start);
    }

    return this.dbService.transaction.findMany({
      select: {
        id: true,
        updated_at: true,
        created_at: true,
        customer: {
          select: {
            id: true,
            full_name: true,
            role: true,
          },
        },
        package: true,
        status: true,
        code: true,
        payment: {
          select: {
            payment_bill: true,
          },
        },
        bike: {
          select: {
            id: true,
          },
        },
      },
      ...filter,
      orderBy: {
        id: 'desc',
      },
      ...paginate,
    });
  }

  async findOne(id: string) {
    const decId = this.security.decryptId(id);
    return this.dbService.transaction.findUnique({
      where: { id: decId },
      select: {
        id: true,
        status: true,
        updated_at: true,
        created_at: true,
        code: true,
        customer: {
          select: {
            id: true,
            full_name: true,
            role: true,
          },
        },
        package: {
          select: {
            id: true,
            lat_destination: true,
            lngt_destination: true,
            lat_start: true,
            lngt_start: true,
            code: true,
            description: true,
            name: true,
            price: true,
            points: true,
          }
        },
        payment: true,
        bike: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async updateStatus(id: string, status: TransactionStatus) {
    const decId = this.security.decryptId(id);
    const result = await this.dbService.transaction.update({
      where: { id: decId },
      data: { status: status },
    });

    this.gate.server.emit('on_change_status_order', {
      status: result.status,
      code: result.code,
    });

    return result != null;
  }

  async remove(id: string) {
    const decId = this.security.decryptId(id);
    const result = await this.dbService.transaction.update({
      where: { id: decId },
      data: { status: TransactionStatus.REJECTED },
    });
    return result != null;
  }

  async checkout(id: string, tranferBill: string) {
    const decId = this.security.decryptId(id);
    const result = await this.dbService.transaction.update({
      where: { id: decId },
      data: {
        payment: {
          update: {
            is_paid: true,
            payment_bill: tranferBill,
          },
        },
      },
    });

    return result != null;
  }
}
