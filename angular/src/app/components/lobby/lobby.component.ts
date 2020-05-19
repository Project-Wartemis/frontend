import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { Lobby } from 'interfaces/base';
import { RoomService } from 'services/room/room.service';
import { NewRoomDialogComponent } from 'components/dialogs/new-room/new-room.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {

  lobby: Lobby;
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.roomService.lobby$.subscribe({
      next: lobby => this.lobby = lobby
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openDialogNewRoom(): void {
    const dialogRef = this.dialog.open(NewRoomDialogComponent, {
      width: '250px',
      data: this.lobby.clients.engine,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.roomService.newRoom(result.name, result.engine);
      }
    });
  }
}
