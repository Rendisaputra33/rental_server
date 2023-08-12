import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { Bike } from '@prisma/client';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';
export declare class BikeService {
    private readonly prisma;
    private readonly cryptoService;
    constructor(prisma: PrismaService, cryptoService: SecurityService);
    getAllBikes(): Promise<Bike[]>;
    getBikeById(encryptedId: string): Promise<Bike>;
    createBike(data: CreateBikeDto): Promise<Bike>;
    updateBike(encryptedId: string, data: UpdateBikeDto): Promise<Bike>;
    deleteBike(encryptedId: string): Promise<boolean>;
}
