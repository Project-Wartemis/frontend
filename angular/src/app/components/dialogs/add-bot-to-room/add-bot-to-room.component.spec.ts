import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBotToRoomDialogComponent } from './add-bot-to-room.component';

describe('AddBotToRoomDialogComponent', () => {
  let component: AddBotToRoomDialogComponent;
  let fixture: ComponentFixture<AddBotToRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBotToRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBotToRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
