import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiResponse } from '@app/response';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@app/decorators/roles.decorator';
import { RolesGuard } from '../auth/auth.guard';

@Controller('api/v1/news')
@UseGuards(AuthGuard('jwt'))
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @Roles('jurnalis', 'admin')
  @UseGuards(RolesGuard)
  async create(@Body() createNewsDto: CreateNewsDto) {
    const data = await this.newsService.create(createNewsDto);
    return ApiResponse.build({ data });
  }

  @Get()
  async findAll() {
    const data = await this.newsService.findAll();
    return ApiResponse.build({ data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.newsService.findOne(id);
    return ApiResponse.build({ data });
  }

  @Patch(':id')
  @Roles('jurnalis', 'admin')
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    const data = await this.newsService.update(id, dto);
    return ApiResponse.build({ data });
  }

  @Delete(':id')
  @Roles('jurnalis', 'admin')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    const data = await this.newsService.remove(id);
    return ApiResponse.build({ data });
  }
}
