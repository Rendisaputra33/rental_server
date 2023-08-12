import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateBikeDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsOptional()
  image?: string;
}
