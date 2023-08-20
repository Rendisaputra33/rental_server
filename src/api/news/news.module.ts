import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SecurityService } from '../security/security.service';

@Module({
  controllers: [NewsController],
  providers: [SecurityService, NewsService],
})
export class NewsModule {}
