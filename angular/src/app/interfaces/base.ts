export interface Client {
  id: number;
  name: string;
}

export interface Room {
  id: number;
  name: string;
  clients: {
    [key: string]: Client[];
  };
  started: boolean;
  stopped: boolean;
}

export interface Lobby extends Room {
  rooms: Room[];
}
