import { Test, TestingModule } from '@nestjs/testing';
import { PackageController } from './package.controller';
import { PackageModule } from './package.module';

describe('PackageController', () => {
  let controller: PackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PackageModule],
    }).compile();

    controller = module.get<PackageController>(PackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
