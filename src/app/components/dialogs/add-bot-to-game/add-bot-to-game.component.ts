import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'interfaces/base';

@Component({
  selector: 'app-add-bot-to-game',
  templateUrl: './add-bot-to-game.component.html',
  styleUrls: ['./add-bot-to-game.component.scss']
})
export class AddBotToGameDialogComponent {

  public selectedBot: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public bots: Array<Client>,
    private dialogRef: MatDialogRef<AddBotToGameDialogComponent>,
  ) {
    this.selectedBot = bots[0];
  }

  close(selectedBot?: Client): void {
    this.dialogRef.close(selectedBot);
  }
}
