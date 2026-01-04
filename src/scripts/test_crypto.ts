import { CryptoProvider } from '../providers/CryptoProvider.js';

const crypto = new CryptoProvider();
console.log('Generating 32-byte secret (should be 64 chars hex):');
const secret = crypto.generateHex(32);
console.log('Secret:', secret);
console.log('Length:', secret.length);

if (secret.length === 64) {
    console.log('SUCCESS: Length is correct.');
} else {
    console.error('FAILURE: Incorrect length.');
}
