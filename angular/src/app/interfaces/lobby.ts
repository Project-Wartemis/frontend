import { Client } from './client';
import { Room } from './room';

export interface Lobby extends Room {
  rooms: Room[];
}
