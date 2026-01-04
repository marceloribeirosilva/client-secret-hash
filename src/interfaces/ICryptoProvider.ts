export interface ICryptoProvider {
  /**
   * Generates a cryotographically secure random hex string.
   * @param length The number of bytes to generate (entropy).
   * @returns Hexadecimal string representation of the random bytes.
   */
  generateHex(length: number): string;
}
