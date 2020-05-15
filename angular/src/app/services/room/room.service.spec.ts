import { TestBed } from '@angular/core/testing';

import { LobbyService } from './games.service';

describe('LobbyService', () => {
  let service: LobbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
