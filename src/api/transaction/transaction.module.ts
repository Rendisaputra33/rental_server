import { Module } from '@nestjs/common';
import { TransactionService } from '@app/api/transaction/transaction.service';
import { TransactionController } from '@app/api/transaction/transaction.controller';
import { PrismaService } from '@app/prisma.service';
import { RolesGuard } from '@app/api/auth/auth.guard';
import { SecurityService } from '../security/security.service';
import { SocketService } from '@app/gateways/gateway.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerAdvice } from '@app/advice/multer.advice';
import { SecurityModule } from '../security/security.module';
import { GatewayGateway } from '@app/gateways/gateway';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [SecurityModule],
      useFactory: multerAdvice,
    }),
    CloudinaryModule,
  ],
  controllers: [TransactionController],
  providers: [
    GatewayGateway,
    PrismaService,
    SecurityService,
    SocketService,
    TransactionService,
    RolesGuard,
  ],
})
export class TransactionModule {}
