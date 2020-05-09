import { Client } from './client';

export interface Room {
  name: string;
  key: string;
  clients: Client[];
}
