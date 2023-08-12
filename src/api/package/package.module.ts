import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';
import { RolesGuard } from '../auth/auth.guard';

@Module({
  imports: [],
  controllers: [PackageController],
  providers: [SecurityService, PackageService, PrismaService, RolesGuard],
})
export class PackageModule {}
