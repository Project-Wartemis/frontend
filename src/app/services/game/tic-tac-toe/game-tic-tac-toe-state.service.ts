import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { State } from 'interfaces/game/tic-tac-toe';

@Injectable({
  providedIn: 'root'
})
export class GameTicTacToeStateService {

  public state$: BehaviorSubject<State>;

  constructor() {
    this.state$ = new BehaviorSubject<State>(null);
  }

  public processNewState(raw: object): void {
    const state: State = Object.assign({} as State, raw);
    this.state$.next(state);
  }
}
