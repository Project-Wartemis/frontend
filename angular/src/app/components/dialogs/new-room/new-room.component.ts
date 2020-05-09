import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Room } from 'interfaces/room';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomDialogComponent {

  room: Room;

  constructor(
    private dialogRef: MatDialogRef<NewRoomDialogComponent>
  ) {
    this.room = {} as Room;
  }

  close(room?: Room): void {
    this.dialogRef.close(room);
  }

}
