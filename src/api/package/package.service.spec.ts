import { Test, TestingModule } from '@nestjs/testing';
import { PackageService } from './package.service';
import { PackageModule } from './package.module';

describe('PackageService', () => {
  let service: PackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PackageModule],
    }).compile();

    service = module.get<PackageService>(PackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
