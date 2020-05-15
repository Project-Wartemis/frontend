import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'interfaces/base';

@Component({
  selector: 'app-add-bot-to-room',
  templateUrl: './add-bot-to-room.component.html',
  styleUrls: ['./add-bot-to-room.component.scss']
})
export class AddBotToRoomDialogComponent {

  public selectedBot: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddBotToRoomDialogComponent>,
  ) { }

  close(selectedBot?: Client): void {
    this.dialogRef.close(selectedBot);
  }
}
