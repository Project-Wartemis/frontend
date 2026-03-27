export interface Player {
  id: number;
}

export interface Planet {
  id: number;
  name: string;
  x: number;
  y: number;
  player: number;
  ships: number;
}

export interface Move {
  id: number;
  source: number;
  target: number;
  player: number;
  ships: number;
  turns: number;
}

export interface State {
  players: Array<number>;
  planets: Array<Planet>;
  moves: Array<Move>;
}

export interface MoveInternal {
  id: number;
  player: number;
  ships: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  angle: number;
}

export interface StateInternal {
  players: Array<number>;
  planets: Array<Planet>;
  moves: Array<MoveInternal>;
}
