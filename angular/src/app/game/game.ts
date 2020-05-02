import { Player } from '../player/player';

export interface Game {
  id: number;
  name: string;
  slots: number;
  turn: number;
  players: Player[];
}
