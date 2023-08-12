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
import { BikeService } from './bike.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { Roles } from '@app/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/auth.guard';
import { ApiResponse } from '@app/response';

@Controller('/api/v1/bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Get()
  async getAllBikes(): Promise<ApiResponse<any>> {
    const data = await this.bikeService.getAllBikes();
    return ApiResponse.build({ data });
  }

  @Get(':encryptedId')
  async getBikeById(
    @Param('encryptedId') encryptedId: string,
  ): Promise<ApiResponse<any>> {
    const data = await this.bikeService.getBikeById(encryptedId);
    return ApiResponse.build({ data });
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createBike(@Body() payload: CreateBikeDto): Promise<ApiResponse<any>> {
    const data = await this.bikeService.createBike(payload);
    return ApiResponse.build({ data });
  }

  @Patch(':encryptedId')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateBike(
    @Param('encryptedId') encryptedId: string,
    @Body() payload: UpdateBikeDto,
  ): Promise<ApiResponse<any>> {
    const data = await this.bikeService.updateBike(encryptedId, payload);
    return ApiResponse.build({ data });
  }

  @Delete(':encryptedId')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteBike(
    @Param('encryptedId') encryptedId: string,
  ): Promise<ApiResponse<any>> {
    const data = await this.bikeService.deleteBike(encryptedId);
    return ApiResponse.build({ data });
  }
}
