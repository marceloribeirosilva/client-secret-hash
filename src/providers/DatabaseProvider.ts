import mysql, { type Pool, type PoolOptions } from 'mysql2/promise';
import type { IDatabaseProvider } from '../interfaces/IDatabaseProvider.js';

export class DatabaseProvider implements IDatabaseProvider {
  private static instance: DatabaseProvider;
  private pool: Pool;

  private constructor() {
    const access: PoolOptions = {
      host: process.env.DB_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: Number(process.env.DB_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
    
    this.pool = mysql.createPool(access);
  }

  public static getInstance(): DatabaseProvider {
    if (!DatabaseProvider.instance) {
      DatabaseProvider.instance = new DatabaseProvider();
    }
    return DatabaseProvider.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async query(sql: string, params?: any[]): Promise<any> {
    const [results] = await this.pool.execute(sql, params);
    return results;
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}
