import { Client } from './client';

export interface Room {
  name: string;
  key: string;
  bots: Client[];
  spectators: Client[];
}
