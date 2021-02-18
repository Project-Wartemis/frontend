import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChessComponent } from './game-chess.component';

describe('GameChessComponent', () => {
  let component: GameChessComponent;
  let fixture: ComponentFixture<GameChessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameChessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameChessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
