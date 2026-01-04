export interface IClient {
  id: number;
  client_id: string;
  client_secret: string;
  name: string;
  active: number;
  created_at: Date;
  updated_at: Date;
}
