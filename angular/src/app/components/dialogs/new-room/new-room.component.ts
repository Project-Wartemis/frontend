import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'interfaces/base';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomDialogComponent {

  public name: string;
  public engine: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public engines: Array<Client>,
    private dialogRef: MatDialogRef<NewRoomDialogComponent>,
  ) {
    if(this.engines?.length) {
      this.engine = this.engines[0];
    }
  }

  close(name?: string, engine?: Client): void {
    if(!name || !engine) {
      this.dialogRef.close();
    } else {
      this.dialogRef.close({name, engine});
    }
  }
}
