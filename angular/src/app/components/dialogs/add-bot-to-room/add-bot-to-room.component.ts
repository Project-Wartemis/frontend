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
    @Inject(MAT_DIALOG_DATA) public bots: Array<Client>,
    private dialogRef: MatDialogRef<AddBotToRoomDialogComponent>,
  ) {
    this.selectedBot = bots[0];
  }

  close(selectedBot?: Client): void {
    this.dialogRef.close(selectedBot);
  }
}
