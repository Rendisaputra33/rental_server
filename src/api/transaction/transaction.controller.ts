import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Roles } from '@app/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/auth.guard';
import { TransactionStatus } from '@prisma/client';
import { ApiResponse } from '@app/response';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('api/v1/transaction')
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly cloudService: CloudinaryService,
  ) {}

  @Post()
  @Roles('customer')
  @UseGuards(RolesGuard)
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() request: any,
  ) {
    const customer = request.user.id;
    const data = await this.transactionService.create({
      ...createTransactionDto,
      customer,
    });

    return ApiResponse.build({ data, statusCode: 201 });
  }

  @Get()
  @Roles('admin', 'customer')
  @UseGuards(RolesGuard)
  async findAll(
    @Req() req: any,
    @Query('limit') limit?: string,
    @Query('start') start?: string,
  ) {
    const data = await this.transactionService.findAll({
      customer: req.user.role == 'admin' ? undefined : req.user.id,
      start,
      limit,
    });
    return ApiResponse.build({ data });
  }

  @Get(':id')
  @Roles('admin', 'customer')
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string) {
    const data = await this.transactionService.findOne(id);
    return ApiResponse.build({ data });
  }

  @Patch(':id')
  @Roles('admin', 'customer')
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() { status }: any) {
    const data = await this.transactionService.updateStatus(
      id,
      TransactionStatus[status],
    );
    return ApiResponse.build({ data });
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    const data = await this.transactionService.remove(id);
    return ApiResponse.build({ data });
  }

  @Post('/:id/checkout')
  @UseInterceptors(FileInterceptor('transfer_bill'))
  async payment(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { secure_url } = await this.cloudService.uploadFile(file);
    const data = await this.transactionService.checkout(id, secure_url);
    return ApiResponse.build({ data });
  }
}
