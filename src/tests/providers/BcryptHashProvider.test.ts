import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BcryptHashProvider } from '../../providers/BcryptHashProvider.js';

describe('BcryptHashProvider', () => {
  const provider = new BcryptHashProvider();

  it('should hash a secret', async () => {
    const secret = 'my-secret-value';
    const hashed = await provider.hash(secret);
    
    assert.notStrictEqual(hashed, secret);
    assert.ok(hashed.startsWith('$2b$'));
  });

  it('should correctly compare a valid secret', async () => {
    const secret = 'secret-to-match';
    const hashed = await provider.hash(secret);
    
    const isValid = await provider.compare(secret, hashed);
    assert.strictEqual(isValid, true);
  });

  it('should return false for an invalid secret', async () => {
    const secret = 'valid-secret';
    const hashed = await provider.hash(secret);
    
    const isValid = await provider.compare('wrong-secret', hashed);
    assert.strictEqual(isValid, false);
  });
});
