import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { Client, Lobby, Room } from 'interfaces/base';
import { RoomService } from 'services/room/room.service';
import { NewRoomDialogComponent } from 'components/dialogs/new-room/new-room.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {

  lobby: Lobby;
  rooms: {
    open: Room[];
    started: Room[];
    finished: Room[];
  } = {
    open: [],
    started: [],
    finished: [],
  };
  engines: Client[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.roomService.lobby$.subscribe({
      next: this.updateLobby.bind(this)
    }));
  }

  private updateLobby(lobby: Lobby): void {
    if(!lobby) {
      return;
    }
    this.lobby = lobby;
    this.rooms.open = this.lobby.rooms.filter(room => !room.started);
    this.rooms.started = this.lobby.rooms.filter(room => room.started && !room.stopped);
    this.rooms.finished = this.lobby.rooms.filter(room => room.stopped);
    this.engines = this.lobby.clients.filter(client => client.type === 'engine');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public openDialogNewRoom(): void {
    const dialogRef = this.dialog.open(NewRoomDialogComponent, {
      width: '250px',
      data: this.engines,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.roomService.newRoom(result.name, result.engine);
      }
    });
  }
}
