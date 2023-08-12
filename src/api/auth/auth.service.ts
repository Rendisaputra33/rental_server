import { PrismaService } from '../../prisma.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAccountDto, SignInDto } from './dto/auth.dto';
import * as security from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '../security/security.service';
import { DuplicateException } from '@app/errors/duplicate.exception';

@Injectable()
class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly security: SecurityService,
  ) {}

  async getCurrentUser() {
    return await this.prismaService.account.findMany();
  }

  /**
   * creator account
   * @param payload mapping data for creating account
   * @returns
   */
  async createAccount(payload: CreateAccountDto) {
    const findEmail = await this.prismaService.account.findUnique({
      where: { email: payload.email },
    });

    if (findEmail != null) {
      throw new DuplicateException('Email sudah pernah mendaftar');
    }

    const newUser = await this.prismaService.account.create({
      data: {
        full_name: `${payload.first_name} ${payload.last_name}`,
        password: await security.hash(payload.password, 12),
        email: payload.email,
        address: payload.address,
      },
    });

    if (Object.values(newUser).length < 1) {
      throw new BadRequestException(['error create account']);
    }

    return {
      email: newUser.email,
      name: newUser.full_name,
      address: newUser.address,
    };
  }

  /**
   * creator account
   * @param payload mapping data for creating account
   * @returns
   */
  async updateAccount(id: string, payload: CreateAccountDto) {
    const decId = this.security.decryptId(id);

    const user = await this.prismaService.account.findUnique({
      where: { id: decId },
    });

    const newUser = await this.prismaService.account.update({
      where: { id: decId },
      data: {
        full_name: `${payload.first_name} ${payload.last_name}`,
        password:
          payload.password == 'defaultt'
            ? user.password
            : await security.hash(payload.password, 12),
        email: payload.email,
        address: payload.address,
      },
    });

    if (Object.values(newUser).length < 1) {
      throw new BadRequestException(['error create account']);
    }

    return {
      email: newUser.email,
      name: newUser.full_name,
      address: newUser.address,
    };
  }

  /**
   * sign in handler
   */
  async signIn({ email, password }: SignInDto) {
    const user = await this.prismaService.account.findUnique({
      where: { email },
    });

    if (user == null) {
      throw new UnauthorizedException('username/password worng');
    }

    if (!(await security.compare(password, user.password))) {
      throw new UnauthorizedException('username/password worng');
    }

    const payload = { sub: user.id, name: user.full_name };
    const access_token = await this.jwtService.signAsync(payload);

    await this.prismaService.account.update({
      where: { id: user.id },
      data: { token: access_token },
    });

    delete user.createdAt;
    delete user.password;
    delete user.role;
    delete user.updatedAt;
    delete user.token;

    return { access_token, ...user };
  }

  async validateUserById(userId: number) {
    return this.prismaService.account.findUnique({ where: { id: userId } });
  }
}

export default AuthService;
