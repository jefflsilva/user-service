import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IHashUtil } from '../domain/interfaces/hash.util';

@Injectable()
export class BcryptHashUtil implements IHashUtil {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
