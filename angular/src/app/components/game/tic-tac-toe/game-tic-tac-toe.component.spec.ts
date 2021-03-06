import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTicTacToeComponent } from './game-tic-tac-toe.component';

describe('GameTicTacToeComponent', () => {
  let component: GameTicTacToeComponent;
  let fixture: ComponentFixture<GameTicTacToeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTicTacToeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
