import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsStartGoComponent } from './go.component';

describe('DocsStartGoComponent', () => {
  let component: DocsStartGoComponent;
  let fixture: ComponentFixture<DocsStartGoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsStartGoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsStartGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
