import { Client } from './client';
import { Room } from './room';

export interface Lobby {
  name: string;
  key: string;
  clients: Client[];
  rooms: Room[];
}
