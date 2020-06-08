interface State {
  players: Array<number>;
  planets: Array<Planet>;
  moves: Array<Move>;
}

interface Planet {
  id: number;
  name: string; // name, not relevant for the actual game
  x: number; // position
  y: number; // position
  player: number; // references a player
  ships: number; // how many ships this planet has
}

interface Move {
  id: number;
  source: number; // references a planet
  target: number; // references a planet
  player: number; // references a player
  ships: number; // how many ships are in this fleet
  turns: number; // how long it will take for this fleet to arrive
}
