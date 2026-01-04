export interface IDatabaseProvider {
  query(sql: string, params?: any[]): Promise<any>;
  close(): Promise<void>;
}
