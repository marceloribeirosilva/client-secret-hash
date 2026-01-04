export interface ISecretService {
  /**
   * Generates a secure client secret.
   * @returns High-entropy hex string.
   */
  generateClientSecret(): string;

  /**
   * Hashes a secret for secure storage.
   * @param secret The plain text secret.
   * @returns The hashed secret.
   */
  hash(secret: string): Promise<string>;

  /**
   * Compares a plain secret with a hashed one.
   * @param secret Plain text secret
   * @param hashed stored hash
   */
  compare(secret: string, hashed: string): Promise<boolean>;
}
