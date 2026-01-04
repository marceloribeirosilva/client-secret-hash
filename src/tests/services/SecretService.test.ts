import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SecretService } from '../../services/SecretService.js';
import type { ICryptoProvider } from '../../interfaces/ICryptoProvider.js';
import type { IHashProvider } from '../../interfaces/IHashProvider.js';

// Mocks
class MockCryptoProvider implements ICryptoProvider {
  generateHex(length: number): string {
    return 'mocked-hex-value';
  }
}

class MockHashProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    return `hashed-${payload}`;
  }
  async compare(payload: string, hashed: string): Promise<boolean> {
    return hashed === `hashed-${payload}`;
  }
}

describe('SecretService', () => {
  const cryptoProvider = new MockCryptoProvider();
  const hashProvider = new MockHashProvider();
  const service = new SecretService(cryptoProvider, hashProvider);

  it('should generate a secret using crypto provider', () => {
    const secret = service.generateClientSecret();
    assert.strictEqual(secret, 'mocked-hex-value');
  });

  it('should hash a secret using hash provider', async () => {
    const hash = await service.hash('test');
    assert.strictEqual(hash, 'hashed-test');
  });

  it('should compare a secret using hash provider', async () => {
    const valid = await service.compare('test', 'hashed-test');
    assert.strictEqual(valid, true);

    const invalid = await service.compare('test', 'hashed-other');
    assert.strictEqual(invalid, false);
  });
});
