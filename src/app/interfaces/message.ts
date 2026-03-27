import { Lobby } from './base';

export interface Message {
  type: string;
}

export interface ActionMessage extends Message {
  game: number;
  key: string;
  action: object;
}

export interface CreatedMessage extends Message {
  game: number;
}

export interface ErrorMessage extends Message {
  message: string;
}

export interface GameMessage extends Message {
  name: string;
  engine: number;
}

export interface HistoryMessage extends Message {
  messages: Array<StateMessage>;
}

export interface InviteMessage extends Message {
  game: number;
  bot: number;
}

export interface JoinMessage extends Message {
  game: number;
}

export interface LeaveMessage extends Message {
  game: number;
}

export interface LobbyMessage extends Message {
  lobby: Lobby;
}

export interface RegisterMessage extends Message {
  clientType: string;
  name: string;
  game: string;
}

export interface StartMessage extends Message {
  game: number;
}

export interface StateMessage extends Message {
  game: number;
  key: string;
  turn: number;
  move: boolean;
  state: object;
}
