import { TestBed } from '@angular/core/testing';

import { GamePlanetWarsStateService } from './game-planet-wars-state.service';

describe('GamePlanetWarsStateService', () => {
  let service: GamePlanetWarsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePlanetWarsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
