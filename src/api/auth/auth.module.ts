import { Module } from '@nestjs/common';
import AuthService from '@app/api/auth/auth.service';
import AuthController from '@app/api/auth/auth.controller';
import { PrismaService } from '@app/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { RolesGuard } from './auth.guard';
import { SecurityService } from '../security/security.service';

const privateKey = process.env.SECRET;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: privateKey,
      signOptions: {
        expiresIn: '2 days',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    SecurityService,
    AuthService,
    AuthStrategy,
    RolesGuard,
  ],
  exports: [AuthStrategy, PassportModule],
})
export class AuthModule {}
