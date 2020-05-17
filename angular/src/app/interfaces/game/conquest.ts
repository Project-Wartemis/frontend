export interface Player {
  id: number;
  name: string;
  power: number;
}

export interface Node {
  id: number;
  name: string;
  owner: number;
  power: number;
}

export interface Link {
  source: number;
  target: number;
}

export interface Deploy {
  target: number;
  power: number;
}

export interface Move {
  source: number;
  target: number;
  power: number;
}

export interface Events {
  deploys: Array<Deploy>;
  moves: Array<Move>;
}

export interface GameState {
  players: Array<Player>;
  nodes: Array<Node>;
  links: Array<Link>;
  events: Events;
}

// internal

export interface NodeInternal extends Node {
  links: Array<NodeInternal>;
}

export interface LinkInternal extends Link {
  isMove: boolean;
  power: number;
}

export interface GameStateInternal {
  players: Array<Player>;
  nodes: Array<NodeInternal>;
  links: Array<LinkInternal>;
  events: Events;
}
