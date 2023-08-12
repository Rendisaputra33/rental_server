import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';
import { NamingService } from '../security/naming.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [NamingService, CloudinaryProvider, CloudinaryService],
  exports: [NamingService, CloudinaryService],
})
export class CloudinaryModule {}
