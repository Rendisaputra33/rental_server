import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {
  private readonly algorithm: string = 'aes-256-cbc';
  private secret: string = process.env.ID_ENC;

  private readonly iv: string = 'ffffffffffffffff';
  private readonly key: Buffer;

  constructor() {
    this.key = crypto.createHash('sha256').update(this.secret).digest();
  }

  encryptId(id: number): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(id.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decryptId(encryptedId: string): number {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedId, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return parseInt(decrypted, 10);
  }
}
