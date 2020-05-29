import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBotToGameDialogComponent } from './add-bot-to-game.component';

describe('AddBotToGameDialogComponent', () => {
  let component: AddBotToGameDialogComponent;
  let fixture: ComponentFixture<AddBotToGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBotToGameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBotToGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
