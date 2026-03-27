interface Action {
  deploys: Array<Deploy>;
  moves: Array<Move>;
}

interface Deploy {
  node: number; // references a node
  troops: number; // how many troops are deployed
}

interface Move {
  source: number; // references a node
  target: number; // references a node
  troops: number; // how many troops will move
}
