import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'nama depan tidak boleh kosong' })
  first_name: string;

  @IsNotEmpty({ message: 'nama belakang tidak boleh kosong' })
  last_name: string;

  @IsNotEmpty({ message: 'alamat tidak boleh kosong' })
  address: string;

  @IsNotEmpty({ message: 'email harus diisi' })
  @IsEmail({}, { message: 'format email salah' })
  email: string;

  @IsNotEmpty({ message: 'password harus diisi' })
  @MinLength(8, { message: 'panjang password minimal 8 karakter' })
  password: string;
}

export class SignInDto {
  @IsNotEmpty({ message: 'email harus diisi' })
  @IsEmail({}, { message: 'format email salah' })
  email: string;

  @IsNotEmpty({ message: 'password harus diisi' })
  @MinLength(8, { message: 'panjang password minimal 8 karakter' })
  password: string;
}
