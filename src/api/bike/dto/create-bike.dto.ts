import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBikeDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsOptional()
  image?: string;
}
