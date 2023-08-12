import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Req,
  Put,
  Param,
} from '@nestjs/common';
import AuthService from './auth.service';
import { CreateAccountDto, SignInDto } from './dto/auth.dto';
import { ApiResponse } from '@app/response';
import { Roles } from '@app/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth.guard';
import { DuplicateException } from '@app/errors/duplicate.exception';

@Controller('/api/v1/auth')
class AuthController {
  /**
   * injection dependencies
   * @param authService
   */
  constructor(private readonly authService: AuthService) {}

  @Get()
  // @Roles('admin')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getCurrentUser(): Promise<any> {
    const data = await this.authService.getCurrentUser();
    return ApiResponse.build({ data });
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async getLoginnedUser(@Req() req: any): Promise<any> {
    const data = req.user;
    delete data.password;
    return ApiResponse.build({ data });
  }

  @Post()
  async createNewUser(
    @Body() user: CreateAccountDto,
  ): Promise<ApiResponse<any>> {
    try {
      const data = await this.authService.createAccount(user);
      return ApiResponse.build({ data });
    } catch (error) {
      if (error instanceof DuplicateException) {
        throw new BadRequestException([error.message]);
      } else {
        throw new BadRequestException(['Terjadi kesalahan saat mendaftar']);
      }
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Body() user: CreateAccountDto,
    @Param('id') id: string,
  ): Promise<ApiResponse<any>> {
    try {
      const data = await this.authService.updateAccount(id, user);
      return ApiResponse.build({ data });
    } catch (error) {
      throw new BadRequestException(['terjadi kesalahan saat menyimpan']);
    }
  }

  @Post('/signin')
  async signInToAccount(@Body() request: SignInDto): Promise<any> {
    const data = await this.authService.signIn(request);
    return ApiResponse.build({ data });
  }
}

export default AuthController;
