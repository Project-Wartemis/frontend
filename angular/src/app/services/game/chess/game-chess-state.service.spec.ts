import { TestBed } from '@angular/core/testing';

import { GameChessStateService } from './game-chess-state.service';

describe('GameChessStateService', () => {
  let service: GameChessStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameChessStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
