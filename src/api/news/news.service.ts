import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';

@Injectable()
export class NewsService {
  /**
   * injections
   * @param dbService
   */
  constructor(
    private readonly dbService: PrismaService,
    private readonly security: SecurityService,
  ) {}

  async create({ body, title }: CreateNewsDto) {
    const result = await this.dbService.news.create({
      data: {
        body: body,
        slug: title.split(' ').join('-').toLowerCase(),
        title: title,
        thumbnail: '',
      },
    });
    return result;
  }

  async findAll() {
    return await this.dbService.news.findMany();
  }

  async findOne(identity: string) {
    const id = this.security.decryptId(identity);
    const result = await this.dbService.news.findUnique({ where: { id } });
    return result;
  }

  async update(identity: string, { body, title }: UpdateNewsDto) {
    const id = this.security.decryptId(identity);
    const result = await this.dbService.news.update({
      where: { id },
      data: {
        body,
        title,
      },
    });
    return result;
  }

  async remove(identity: string) {
    const id = this.security.decryptId(identity);
    const result = await this.dbService.news.delete({
      where: { id },
    });
    return result != null;
  }
}
