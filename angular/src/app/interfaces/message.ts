import { Lobby } from './base';

export interface Message {
  type: string;
}

export interface ActionMessage extends Message {
  action: object;
}

export interface ErrorMessage extends Message {
  message: string;
}

export interface InviteMessage extends Message {
  room: number;
  client: number;
}

export interface LobbyMessage extends Message {
  lobby: Lobby;
}

export interface RegisterMessage extends Message {
  clientType: string;
  name: string;
}

export interface RoomMessage extends Message {
  name: string;
  engine: number;
}

export interface StateMessage extends Message {
  state: object;
}
