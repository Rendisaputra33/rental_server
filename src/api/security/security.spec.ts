import { Test, TestingModule } from '@nestjs/testing';
import { SecurityModule } from './security.module';
import { SecurityService } from './security.service';
import { ConfigModule } from '@nestjs/config';

describe('Security test service', () => {
  let service: SecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), SecurityModule],
    }).compile();

    service = module.get<SecurityService>(SecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return same encrypted id', async () => {
    const id = 1;
    const encId = service.encryptId(id);
    console.log(encId);
    const sameEncId = service.encryptId(id);

    expect(sameEncId).toBe(encId);
  });

  it('should return decrypted id', async () => {
    const id = 1;
    const encId = service.encryptId(id);
    const decId = service.decryptId(encId);

    expect(decId).toBe(id);
  });
});
