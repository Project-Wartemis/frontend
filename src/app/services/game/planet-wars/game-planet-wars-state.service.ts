import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { MoveInternal, State, StateInternal } from 'interfaces/game/planet-wars';

@Injectable()
export class GamePlanetWarsStateService {

  public state$: BehaviorSubject<StateInternal>;

  constructor() {
    this.state$ = new BehaviorSubject<StateInternal>(null);
  }

  public getCurrentState(): StateInternal {
    if(this.state$.getValue()) {
      return this.state$.getValue();
    }
    return {
      players: [],
      planets: [],
    } as StateInternal;
  }

  public processNewState(raw: object): void {
    const state: State = Object.assign({} as State, raw);
    const result = this.getCurrentState();

    result.players = state.players;
    result.planets = state.planets;
    result.moves = state.moves.map(move => {
      const source = state.planets.find(p => p.id === move.source);
      const target = state.planets.find(p => p.id === move.target);
      let dx = target.x - source.x;
      let dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      dx /= dist;
      dy /= dist;
      // dx and dy are now a unit vector from source -> target
      return {
        id: move.id,
        player: move.player,
        ships: move.ships,
        x: target.x - dx * move.turns,
        y: target.y - dy * move.turns,
        dx,
        dy,
        angle: Math.atan2(dy, dx) * 180 / Math.PI
      } as MoveInternal;
    });

    this.state$.next(result);
  }
}
