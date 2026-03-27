import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsGameTicTacToeComponent } from './tic-tac-toe.component';

describe('DocsGameTicTacToeComponent', () => {
  let component: DocsGameTicTacToeComponent;
  let fixture: ComponentFixture<DocsGameTicTacToeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsGameTicTacToeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsGameTicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
