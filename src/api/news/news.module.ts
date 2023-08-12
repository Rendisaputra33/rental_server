import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';

@Module({
  controllers: [NewsController],
  providers: [PrismaService, SecurityService, NewsService],
})
export class NewsModule {}
