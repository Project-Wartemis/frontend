import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsStartPythonComponent } from './docs-start-python.component';

describe('DocsStartPythonComponent', () => {
  let component: DocsStartPythonComponent;
  let fixture: ComponentFixture<DocsStartPythonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsStartPythonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsStartPythonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
