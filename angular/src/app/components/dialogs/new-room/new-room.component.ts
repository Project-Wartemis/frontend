import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Room } from 'interfaces/base';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.scss']
})
export class NewRoomDialogComponent {

  room: Room;

  constructor(
    private dialogRef: MatDialogRef<NewRoomDialogComponent>,
  ) {
    this.room = {} as Room;
  }

  close(room?: Room): void {
    this.dialogRef.close(room);
  }
}
