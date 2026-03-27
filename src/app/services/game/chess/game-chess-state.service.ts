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
    const parts = state.fen.split(' ');
    const ply = (+parts[5]) * 2 + (parts[1] === 'w' ? 0 : 1);
    const chars = parts[0];
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
        id: x + 8 * y + 64 * ply,
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
