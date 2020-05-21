export interface Client {
  id: number;
  type: string;
  name: string;
}

export interface Room {
  id: number;
  name: string;
  clients: Client[];
  started: boolean;
  stopped: boolean;
}

export interface Lobby extends Room {
  rooms: Room[];
}
