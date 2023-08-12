import { Module } from '@nestjs/common';
import { AuthModule } from '@app/api/auth/auth.module';
import { PrismaService } from '@app/prisma.service';
import { BikeModule } from '@app/api/bike/bike.module';
import { PackageModule } from '@app/api/package/package.module';
import { ConfigModule } from '@nestjs/config';
import { SecurityModule } from '@app/api/security/security.module';
import { TransactionModule } from './api/transaction/transaction.module';
import { GatewayModule } from './gateways/gateway.module';
import { AssetsController } from './assets.controller';
import { CloudinaryModule } from './api/cloudinary/cloudinary.module';
import { AppController } from './app.controller';
import { NewsModule } from './api/news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BikeModule,
    PackageModule,
    SecurityModule,
    TransactionModule,
    GatewayModule,
    CloudinaryModule,
    NewsModule,
  ],
  controllers: [AppController, AssetsController],
  providers: [PrismaService],
})
export class AppModule {}
