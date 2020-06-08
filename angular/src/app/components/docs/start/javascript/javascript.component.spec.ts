import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsStartJavascriptComponent } from './docs-start-javascript.component';

describe('DocsStartJavascriptComponent', () => {
  let component: DocsStartJavascriptComponent;
  let fixture: ComponentFixture<DocsStartJavascriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsStartJavascriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsStartJavascriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
