import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { NamingService } from './naming.service';

@Module({
  providers: [SecurityService, NamingService],
})
export class SecurityModule {}
