import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { State } from 'interfaces/game/hex-tac-toe';

@Injectable()
export class GameHexTacToeStateService {

  public state$: BehaviorSubject<State>;

  constructor() {
    this.state$ = new BehaviorSubject<State>(null);
  }

  public processNewState(raw: object): void {
    const state: State = Object.assign({} as State, raw);
    this.state$.next(state);
  }

}
