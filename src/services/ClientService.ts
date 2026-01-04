import type { IClientRepository } from '../interfaces/IClientRepository.js';
import type { ISecretService } from '../interfaces/ISecretService.js';

export class ClientService {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly secretService: ISecretService
  ) {}

  public async createClient(name: string): Promise<void> {
    if (!name.trim()) {
      throw new Error('Client name cannot be empty');
    }
    console.log(`Creating client with name: ${name}`);
    
    // 1. Generate Plain Text Secret
    const secret = this.secretService.generateClientSecret();
    console.log('Generated Secret (Save this now! It will not be shown again):', secret);

    // 2. Hash Secret
    const hashedSecret = await this.secretService.hash(secret);

    // 3. Save Hashed Secret
    await this.clientRepository.create(name, hashedSecret);
    console.log('Client description saved successfully (Secret Hashed).');
  }

  public async authenticate(clientId: string, clientSecret: string): Promise<boolean> {
    const client = await this.clientRepository.findByClientId(clientId);
    if (!client) {
      return false;
    }
    return this.secretService.compare(clientSecret, client.client_secret);
  }
}
