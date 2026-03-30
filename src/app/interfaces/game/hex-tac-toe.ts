export type PlayerSymbol = 'X' | 'O';

export interface Placement {
  q: number;
  r: number;
}

export interface PlayerState {
  id: string;
  symbol: PlayerSymbol;
}

export interface Stone extends Placement {
  player: string;
  symbol: PlayerSymbol;
}

export interface NextTurn {
  player: string;
  symbol: PlayerSymbol;
  stonesToPlace: number;
}

export interface Winner {
  player: string;
  symbol: PlayerSymbol;
}

export interface WinningLine {
  cells: Array<Placement>;
  direction: Placement;
}

export interface State {
  players: Array<PlayerState>;
  stones: Array<Stone>;
  next: NextTurn;
  winner: Winner | null;
  winningLine: WinningLine | null;
  turnIndex: number;
}
