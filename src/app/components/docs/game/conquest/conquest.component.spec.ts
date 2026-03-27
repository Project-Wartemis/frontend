import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsGameConquestComponent } from './docs-game-conquest.component';

describe('DocsGameConquestComponent', () => {
  let component: DocsGameConquestComponent;
  let fixture: ComponentFixture<DocsGameConquestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsGameConquestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsGameConquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
