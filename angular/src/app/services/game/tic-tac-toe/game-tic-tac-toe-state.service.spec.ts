import { TestBed } from '@angular/core/testing';

import { GameTicTacToeStateService } from './game-tic-tac-toe-state.service';

describe('GameTicTacToeStateService', () => {
  let service: GameTicTacToeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTicTacToeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
