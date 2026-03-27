import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsScratchComponent } from './docs-scratch.component';

describe('DocsScratchComponent', () => {
  let component: DocsScratchComponent;
  let fixture: ComponentFixture<DocsScratchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsScratchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsScratchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
