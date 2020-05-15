export interface Client {
  name: string;
  key: string;
}

export interface Room {
  name: string;
  key: string;
  clients: {
    [key: string]: Client[];
  };
}

export interface Lobby extends Room {
  rooms: Room[];
}
