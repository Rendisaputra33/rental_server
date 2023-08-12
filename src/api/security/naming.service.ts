import { Injectable } from '@nestjs/common';
import * as cry from 'crypto';

@Injectable()
export class NamingService {
  public static generateCustomName(): string {
    const customName = cry.randomUUID();
    return customName;
  }
}
