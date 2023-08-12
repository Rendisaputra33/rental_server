import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  customer: number;
  @IsNotEmpty({ message: 'Harus memilih paket terlebih dahulu' })
  packages: number;
  @IsNotEmpty({ message: 'Belum memilih spedah yang akan dikgunakan' })
  bike: number;
  @IsNotEmpty({ message: 'Methode pembayaran tidak boleh kosonng' })
  payment_method: string;
}
