import { Test, TestingModule } from '@nestjs/testing';
import AuthController from './auth.controller';
import { PrismaService } from '@app/prisma.service';
import { CreateAccountDto, SignInDto } from './dto/auth.dto';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

describe('auth module tests', () => {
  let authController: AuthController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('signin', () => {
    it('should register successfully', async () => {
      await prismaService.$executeRawUnsafe('TRUNCATE TABLE Account');
      const payload = new CreateAccountDto();
      payload.email = 'gorengmbah@gmail.com';
      payload.password = 'Gajahmada12';
      payload.first_name = 'Rendi';
      payload.last_name = 'Saputra';
      const response = await authController.createNewUser(payload);
      expect(response.statusCode).toBe(200);
    });

    it('should register failed cause duplicate email', async () => {
      const payload = new CreateAccountDto();
      payload.email = 'gorengmbah@gmail.com';
      payload.password = 'Gajahmada12';
      payload.first_name = 'Rendi';
      payload.last_name = 'Saputra';
      await expect(authController.createNewUser(payload)).rejects.toThrow();
    });

    it('should register failed cause blanks field', async () => {
      const payload = new CreateAccountDto();
      await expect(authController.createNewUser(payload)).rejects.toThrow();
    });

    it('should signin successfully', async () => {
      const payload = new SignInDto();
      payload.email = 'gorengmbah@gmail.com';
      payload.password = 'Gajahmada12';
      const response = await authController.signInToAccount(payload);
      expect(response.statusCode).toBe(200);
      expect(response.data.access_token).toBeDefined();
    });

    it('should signin failed (wrong password)', async () => {
      const payload = new SignInDto();
      payload.email = 'gorengmbah@gmail.com';
      payload.password = 'Gajahmada1';

      await expect(authController.signInToAccount(payload)).rejects.toThrow();
    });

    it('should signin failed (wrong email)', async () => {
      const payload = new SignInDto();
      payload.email = 'gorengmbah@gmai.com';
      payload.password = 'Gajahmada12';

      await expect(authController.signInToAccount(payload)).rejects.toThrow();
    });
  });
});
