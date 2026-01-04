import type { IClient } from '../interfaces/IClient.js';
import type { IDatabaseProvider } from '../interfaces/IDatabaseProvider.js';
import type { IClientRepository } from '../interfaces/IClientRepository.js';

export class ClientRepository implements IClientRepository {
  constructor(private readonly db: IDatabaseProvider) {}

  public async create(name: string, clientSecret: string): Promise<void> {
    const query = 'INSERT INTO clients (name, client_secret) VALUES (?, ?)';
    await this.db.query(query, [name, clientSecret]);
  }

  public async findByClientId(clientId: string): Promise<IClient | null> {
    const query = 'SELECT * FROM clients WHERE client_id = ?';
    const results = await this.db.query(query, [clientId]);
    
    // results is an array of rows
    if (Array.isArray(results) && results.length > 0) {
      return results[0] as IClient;
    }
    
    return null;
  }
}
