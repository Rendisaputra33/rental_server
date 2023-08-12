import { Injectable } from '@nestjs/common';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { Bike } from '@prisma/client';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';

@Injectable()
export class BikeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: SecurityService,
  ) {}

  async getAllBikes(): Promise<Bike[]> {
    return this.prisma.bike.findMany();
  }

  async getBikeById(encryptedId: string): Promise<Bike> {
    const id = this.cryptoService.decryptId(encryptedId);
    return this.prisma.bike.findUnique({ where: { id } });
  }

  async createBike(data: CreateBikeDto): Promise<Bike> {
    return this.prisma.bike.create({
      data: {
        code: data.code,
        name: data.name,
        available: data.available,
        image: data.image,
      },
    });
  }

  async updateBike(encryptedId: string, data: UpdateBikeDto): Promise<Bike> {
    const id = this.cryptoService.decryptId(encryptedId);
    return this.prisma.bike.update({ where: { id }, data });
  }

  async deleteBike(encryptedId: string): Promise<boolean> {
    const id = this.cryptoService.decryptId(encryptedId);
    await this.prisma.bike.delete({ where: { id } });
    return true;
  }
}
