import { randomBytes } from 'node:crypto';
import type { ICryptoProvider } from '../interfaces/ICryptoProvider.js';

export class CryptoProvider implements ICryptoProvider {
  public generateHex(length: number): string {
    return randomBytes(length).toString('hex');
  }
}
