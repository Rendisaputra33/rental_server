import { IsNotEmpty, Min } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty({
    message: 'Kode paket tidak boleh kosong',
  })
  code: string;

  @IsNotEmpty({
    message: 'Nama paket tidak boleh kosong',
  })
  name: string;

  @IsNotEmpty({
    message: 'Deskripsi paket tidak boleh kosong',
  })
  description: string;

  @Min(30000, {
    message: 'Harga minimal Rp. 30.000',
  })
  price: number;

  @IsNotEmpty({
    message: 'Lokasi awal tidak boleh kosong',
  })
  start_loc: string[];

  @IsNotEmpty({
    message: 'Lokasi awal tidak boleh kosong',
  })
  destination_loc: string[];
}
