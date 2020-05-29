export interface Client {
  id: number;
  type: string;
  name: string;
  game?: string;
}

export interface Room {
  name: string;
  clients: Array<Client>;
  bots: Array<Client>;
  engines: Array<Client>;
  viewers: Array<Client>;
}

export interface Player {
  id: number;
  client: Client;
  color?: string;
}

export interface Game extends Room {
  id: number;
  engine: Client;
  players: Array<Player>;
  started: boolean;
  stopped: boolean;
}

export interface Lobby extends Room {
  games: Array<Game>;
}
