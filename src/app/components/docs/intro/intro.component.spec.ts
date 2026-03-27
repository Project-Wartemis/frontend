import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsIntroComponent } from './docs-intro.component';

describe('DocsIntroComponent', () => {
  let component: DocsIntroComponent;
  let fixture: ComponentFixture<DocsIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
