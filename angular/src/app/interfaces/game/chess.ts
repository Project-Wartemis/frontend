export interface State {
  fen: string;
}

export interface StateInternal {
  pieces: Array<Piece>;
}

export interface Piece {
  code: string;
  x: number;
  y: number;
}
