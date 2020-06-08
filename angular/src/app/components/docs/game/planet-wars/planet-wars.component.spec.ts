import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsGamePlanetWarsComponent } from './docs-game-planet-wars.component';

describe('DocsGamePlanetWarsComponent', () => {
  let component: DocsGamePlanetWarsComponent;
  let fixture: ComponentFixture<DocsGamePlanetWarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsGamePlanetWarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsGamePlanetWarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
