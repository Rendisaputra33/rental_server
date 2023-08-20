import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { SecurityService } from '../security/security.service';
import { RolesGuard } from '../auth/auth.guard';

@Module({
  imports: [],
  controllers: [PackageController],
  providers: [SecurityService, PackageService, RolesGuard],
})
export class PackageModule {}
