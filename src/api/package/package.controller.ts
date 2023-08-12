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
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Roles } from '@app/decorators/roles.decorator';
import { RolesGuard } from '../auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@app/response';

@Controller('api/v1/package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(@Body() createPackageDto: CreatePackageDto) {
    const data = await this.packageService.create(createPackageDto);
    return ApiResponse.build({ data });
  }

  @Get()
  // @Roles('customer', )
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findAll() {
    const data = await this.packageService.findAll();
    return ApiResponse.build({ data });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.packageService.findOne(id);
    return ApiResponse.build({ data });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageDto,
  ) {
    const data = await this.packageService.update(id, updatePackageDto);
    return ApiResponse.build({ data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.packageService.remove(id);
    return ApiResponse.build({ data });
  }
}
