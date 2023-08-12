import { Test, TestingModule } from '@nestjs/testing';
import { BikeService } from './bike.service';
import { BikeModule } from './bike.module';
import { ConfigModule } from '@nestjs/config';

describe('BikeService', () => {
  let service: BikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), BikeModule],
    }).compile();

    service = module.get<BikeService>(BikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
