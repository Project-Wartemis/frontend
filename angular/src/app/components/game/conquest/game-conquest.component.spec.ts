import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConquestComponent } from './game-display.component';

describe('GameConquestComponent', () => {
  let component: GameConquestComponent;
  let fixture: ComponentFixture<GameConquestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameConquestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
