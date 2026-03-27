import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlanetWarsComponent } from './game-planet-wars.component';

describe('GamePlanetWarsComponent', () => {
  let component: GamePlanetWarsComponent;
  let fixture: ComponentFixture<GamePlanetWarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlanetWarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlanetWarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
