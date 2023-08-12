import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';

@Injectable()
export class PackageService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly security: SecurityService,
  ) {}

  async create(dto: CreatePackageDto) {
    const [startLat, startLong] = dto.start_loc;
    const [destLat, destLong] = dto.destination_loc;
    return await this.dbService.package.create({
      data: {
        code: dto.code,
        name: dto.name,
        price: dto.price,
        description: dto.description,
        lat_start: startLat,
        lngt_start: startLong,
        lat_destination: destLat,
        lngt_destination: destLong,
      },
    });
  }

  async findAll() {
    return await this.dbService.package.findMany();
  }

  async findOne(id: string) {
    const decid = this.security.decryptId(id);
    return await this.dbService.package.findUnique({
      where: {
        id: decid,
      },
    });
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    const decId = this.security.decryptId(id);
    return await this.dbService.package.update({
      where: {
        id: decId,
      },
      data: {
        name: updatePackageDto.name,
        description: updatePackageDto.description,
        price: updatePackageDto.price,
        lat_start: updatePackageDto.start_loc[0],
        lat_destination: updatePackageDto.destination_loc[0],
        lngt_destination: updatePackageDto.destination_loc[1],
        lngt_start: updatePackageDto.start_loc[1],
      },
    });
  }

  async remove(id: string) {
    const decId = this.security.decryptId(id);
    return await this.dbService.package.delete({
      where: {
        id: decId,
      },
    });
  }
}
