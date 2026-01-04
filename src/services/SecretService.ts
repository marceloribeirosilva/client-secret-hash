import type { ICryptoProvider } from '../interfaces/ICryptoProvider.js';
import type { ISecretService } from '../interfaces/ISecretService.js';
import type { IHashProvider } from '../interfaces/IHashProvider.js';

export class SecretService implements ISecretService {
  constructor(
    private readonly cryptoProvider: ICryptoProvider,
    private readonly hashProvider: IHashProvider
  ) {}

  public generateClientSecret(): string {
    // 32 bytes = 256 bits of entropy, represented as 64 hex characters
    return this.cryptoProvider.generateHex(32);
  }

  public async hash(secret: string): Promise<string> {
    return this.hashProvider.hash(secret);
  }

  public async compare(secret: string, hashed: string): Promise<boolean> {
    return this.hashProvider.compare(secret, hashed);
  }
}
