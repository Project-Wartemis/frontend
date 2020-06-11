interface State {
  players: Array<Player>;
  nodes: Array<Node>;
  links: Array<Link>;
  stages: Stages;
  deploys: Array<Deploy>; // not relevant for a bot
  moves: Array<Move>; // not relevant for a bot
  fights: Fights; // not relevant for a bot
}

interface Player {
  id: number;
  income: number; // how many troops this player gets to deploy the next turn
}

interface Node {
  id: number;
  name: string; // not relevant for the actual game
}

interface Link {
  id: number;
  a: number; // references a node
  b: number; // references a node
}

interface Stages {
  start: Array<NodeState>; // the state of all nodes at the end of the previous state, not relevant for a bot
  travel: Array<NodeState>; // the state of all nodes after all troops moved out, not relevant for a bot
  end: Array<NodeState>; // the state of all nodes after all battles have taken place
}

interface NodeState {
  id: number;
  owner: number; // references a player
  troops: number; // how many troops this node has
}

interface Deploy {
  player: number; // references a player
  node: number; // references a node
  troops: number; // how many troops are deployed
}

interface Move {
  player: number; // references a player
  source: number; // references a node
  target: number; // references a node
  troops: number; // how many troops will move
}

interface Fights {
  travel: Array<Fight>; // fight.location references a link
  combat: Array<Fight>; // fight.location references a node
}

interface Fight {
  location: number; // references a node or a link
  armies: Array<Army>;
}

interface Army {
  player: number; // references a player
  troops: number; // how many troops are in this army
}
