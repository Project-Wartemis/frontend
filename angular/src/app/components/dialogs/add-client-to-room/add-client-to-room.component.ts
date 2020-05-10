import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'interfaces/client';

@Component({
  selector: 'app-add-client-to-room',
  templateUrl: './add-client-to-room.component.html',
  styleUrls: ['./add-client-to-room.component.scss']
})
export class AddClientToRoomDialogComponent {

  public selectedClient: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddClientToRoomDialogComponent>,
  ) { }

  close(client?: Client): void {
    this.dialogRef.close(client);
  }
}
