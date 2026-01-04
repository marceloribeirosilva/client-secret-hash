import bcrypt from 'bcrypt';
import type { IHashProvider } from '../interfaces/IHashProvider.js';

export class BcryptHashProvider implements IHashProvider {
  private readonly SALT_ROUNDS = 10;

  public async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.SALT_ROUNDS);
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
