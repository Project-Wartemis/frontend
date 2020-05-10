import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientToRoomDialogComponent } from './add-client-to-room.component';

describe('AddClientToRoomDialogComponent', () => {
  let component: AddClientToRoomDialogComponent;
  let fixture: ComponentFixture<AddClientToRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientToRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientToRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
