import type { IClient } from './IClient.js';

export interface IClientRepository {
  create(name: string, clientSecret: string): Promise<void>;
  findByClientId(clientId: string): Promise<IClient | null>;
}
