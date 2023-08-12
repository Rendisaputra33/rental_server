import { Test } from '@nestjs/testing';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@app/prisma.service';
import { SecurityService } from '../security/security.service';

describe('BikeController', () => {
  let bikeController: BikeController;
  let prismaService: PrismaService;
  let securityService: SecurityService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [BikeController],
      providers: [PrismaService, SecurityService, BikeService],
    }).compile();

    bikeController = moduleRef.get<BikeController>(BikeController);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    securityService = moduleRef.get<SecurityService>(SecurityService);
  });

  describe('createBike', () => {
    it('should create a new bike', async () => {
      await prismaService.$executeRawUnsafe('TRUNCATE TABLE Bike');
      const createDto: CreateBikeDto = {
        code: 'B001',
        name: 'Mountain Bike',
        available: true,
        image: 'image.jpg',
      };
      const bike = { id: 1, ...createDto };

      const result = await bikeController.createBike(createDto);

      expect(result.code).toBe(bike.code);
    });
  });

  describe('getAllBikes', () => {
    it('should return an array of bikes', async () => {
      const bikes = [
        {
          id: 1,
          code: 'B001',
          name: 'Mountain Bike',
          available: true,
          image: 'image.jpg',
        },
      ];

      const result = await bikeController.getAllBikes();

      expect(result.length).toBe(bikes.length);
    });
  });

  describe('getBikeById', () => {
    it('should return a bike by ID', async () => {
      const bikeId = securityService.encryptId(1);
      const bike = {
        id: 1,
        code: 'B001',
        name: 'Mountain Bike',
        available: true,
        image: 'image.jpg',
      };

      const result = await bikeController.getBikeById(bikeId);

      expect(result.code).toBe(bike.code);
      expect(result.available).toBe(bike.available);
    });

    it('should return a null', async () => {
      const bikeId = securityService.encryptId(2);
      const result = await bikeController.getBikeById(bikeId);

      expect(result).toBeNull();
    });
  });

  describe('updateBike', () => {
    it('should update a bike by ID', async () => {
      const bikeId = securityService.encryptId(1);
      const updateDto: UpdateBikeDto = { code: 'B002', name: 'Road Bike' };
      const updatedBike = {
        id: 1,
        code: 'B002',
        name: 'Road Bike',
        available: true,
        image: 'image.jpg',
      };

      const result = await bikeController.updateBike(bikeId, updateDto);

      expect(result.code).toBe(updatedBike.code);
      expect(result.name).toBe(updatedBike.name);
    });
    it('should error update a bike by ID', async () => {
      const bikeId = securityService.encryptId(2);
      const updateDto: UpdateBikeDto = { code: 'B002', name: 'Road Bike' };
      const result = bikeController.updateBike(bikeId, updateDto);

      await expect(result).rejects.toThrow();
    });
  });

  describe('deleteBike', () => {
    it('should delete a bike by ID', async () => {
      const bikeId = securityService.encryptId(1);
      const result = await bikeController.deleteBike(bikeId);
      expect(result).toBe(true);
    });

    it('should failed delete bike by id', async () => {
      const bikeId = securityService.encryptId(2);
      await expect(bikeController.deleteBike(bikeId)).rejects.toThrow();
    });
  });
});
