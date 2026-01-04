import { describe, it } from 'node:test';
import assert from 'node:assert';
import { CryptoProvider } from '../../providers/CryptoProvider.js';

describe('CryptoProvider', () => {
  const provider = new CryptoProvider();

  it('should generate a hex string of the correct length', () => {
    const length = 16;
    const result = provider.generateHex(length);
    
    // Each byte is 2 hex characters
    assert.strictEqual(result.length, length * 2);
  });

  it('should generate valid hex characters', () => {
    const result = provider.generateHex(10);
    assert.match(result, /^[0-9a-f]+$/);
  });

  it('should generate different values on subsequent calls', () => {
    const val1 = provider.generateHex(10);
    const val2 = provider.generateHex(10);
    assert.notStrictEqual(val1, val2);
  });
});
