import { Module } from '@nestjs/common';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { SecurityService } from '../security/security.service';
import { RolesGuard } from '../auth/auth.guard';

@Module({
  imports: [],
  controllers: [BikeController],
  providers: [SecurityService, BikeService, RolesGuard],
})
export class BikeModule {}
