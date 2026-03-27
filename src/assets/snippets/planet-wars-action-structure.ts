interface Action {
  moves: Array<Move>;
}

interface Move {
  source: number; // references a planet
  target: number; // references a planet
  ships: number; // how many ships to send
}
