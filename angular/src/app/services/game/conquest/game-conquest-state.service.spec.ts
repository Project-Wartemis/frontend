import { TestBed } from '@angular/core/testing';

import { GameConquestStateService } from './game-conquest-state.service';

describe('GameConquestStateService', () => {
  let service: GameConquestStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameConquestStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
