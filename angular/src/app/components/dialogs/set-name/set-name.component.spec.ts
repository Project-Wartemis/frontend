import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNameDialogComponent } from './set-name.component';

describe('SetNameDialogComponent', () => {
  let component: SetNameDialogComponent;
  let fixture: ComponentFixture<SetNameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
