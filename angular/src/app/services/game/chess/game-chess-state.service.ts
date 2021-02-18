import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { State, StateInternal } from 'interfaces/game/chess';

@Injectable({
  providedIn: 'root'
})
export class GameChessStateService {

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
        code: this.characterToCode(char),
        x,
        y
      });
      x++;
    }
    this.state$.next({pieces});
  }

  private characterToCode(character: string): string {
    switch(character) {
      case 'K': return '\u2654';
      case 'Q': return '\u2655';
      case 'R': return '\u2656';
      case 'B': return '\u2657';
      case 'N': return '\u2658';
      case 'P': return '\u2659';
      case 'P': return '\u2659';
      case 'k': return '\u265A';
      case 'q': return '\u265B';
      case 'r': return '\u265C';
      case 'b': return '\u265D';
      case 'n': return '\u265E';
      case 'p': return '\u265F';
      default: return '';
    }
  }
}
