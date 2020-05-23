export interface Client {
  id: number;
  type: string;
  name: string;
  color?: string;
}

export interface Room {
  id: number;
  name: string;
  clients: Client[];
  bots?: Client[];
  engines?: Client[];
  viewers?: Client[];
  started: boolean;
  stopped: boolean;
}

export interface Lobby extends Room {
  rooms: Room[];
}
