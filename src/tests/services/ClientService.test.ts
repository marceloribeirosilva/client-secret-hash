import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ClientService } from '../../services/ClientService.js';
import type { IClientRepository } from '../../interfaces/IClientRepository.js';
import type { ISecretService } from '../../interfaces/ISecretService.js';
import type { IClient } from '../../interfaces/IClient.js';

// Mocks
class MockClientRepository implements IClientRepository {
  public clients: IClient[] = [];
  
  async create(name: string, clientSecret: string): Promise<void> {
    const client: IClient = {
      id: this.clients.length + 1,
      client_id: 'uuid',
      client_secret: clientSecret,
      name,
      active: 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.clients.push(client);
  }

  async findByClientId(clientId: string): Promise<IClient | null> {
    return this.clients.find(c => c.client_id === clientId) || null;
  }
}

class MockSecretService implements ISecretService {
  generateClientSecret(): string {
    return 'plain-secret';
  }
  async hash(secret: string): Promise<string> {
    return `hashed-${secret}`;
  }
  async compare(secret: string, hashed: string): Promise<boolean> {
    return hashed === `hashed-${secret}`;
  }
}

describe('ClientService', () => {
  it('should create a client with hashed secret', async () => {
    const repo = new MockClientRepository();
    const secrets = new MockSecretService();
    const service = new ClientService(repo, secrets);

    await service.createClient('Test App');

    assert.strictEqual(repo.clients.length, 1);
    assert.strictEqual(repo.clients[0]!.name, 'Test App');
    assert.strictEqual(repo.clients[0]!.client_secret, 'hashed-plain-secret');
  });

  it('should authenticate correctly', async () => {
    const repo = new MockClientRepository();
    const secrets = new MockSecretService();
    const service = new ClientService(repo, secrets);

    // Setup client in mock DB
    repo.clients.push({
      id: 1,
      client_id: 'valid-id',
      client_secret: 'hashed-password123',
      name: 'Test',
      active: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Valid
    const success = await service.authenticate('valid-id', 'password123');
    assert.strictEqual(success, true);

    // Invalid Secret
    const failSecret = await service.authenticate('valid-id', 'wrong');
    assert.strictEqual(failSecret, false);

    // Invalid ID
    const failId = await service.authenticate('wrong-id', 'password123');
    assert.strictEqual(failId, false);
  });
});
