import { TestBed } from '@angular/core/testing';

import { GameConquestMockService } from './game-conquest-mock.service';

describe('GameConquestMockService', () => {
  let service: GameConquestMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameConquestMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
