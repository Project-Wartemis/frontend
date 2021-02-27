import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { State, StateInternal } from 'interfaces/game/chess';

@Injectable({
  providedIn: 'root'
})
export class GameChessStateService {

  private readonly pieces = 'KQRBNPkqrbnp';

  public state$: BehaviorSubject<StateInternal>;

  constructor() {
    this.state$ = new BehaviorSubject<StateInternal>(null);
  }

  public processNewState(raw: object): void {
    const state: State = Object.assign({} as State, raw);
    const chars = state.fen.split(' ')[0];
    const pieces = [];
    let x = 0;
    let y = 0;
    for(const char of chars) {
      if(char === '/') {
        x = 0;
        y++;
        continue;
      }
      if(!isNaN(+char)) {
        x += +char;
        continue;
      }
      pieces.push({
        id: x + 8 * y,
        code: this.characterToCode(char),
        x,
        y
      });
      x++;
    }
    this.state$.next({pieces});
  }

  private characterToCode(character: string): string {
    return String.fromCharCode(0x2654 + this.pieces.indexOf(character));
  }
}
