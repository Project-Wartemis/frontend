import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Lobby } from 'interfaces/lobby';
import { Room } from 'interfaces/room';
import { LobbyService } from 'services/lobby/lobby.service';
import { NewRoomDialogComponent } from 'components/dialogs/new-room/new-room.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  lobby: Lobby;

  constructor(
    private dialog: MatDialog,
    private lobbyService: LobbyService
  ) { }

  ngOnInit(): void {
    this.lobbyService.lobby$.subscribe({
      next: lobby => this.lobby = lobby
    });
  }

  newRoomDialog(): void {
    const dialogRef = this.dialog.open(NewRoomDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(room => {
      if(!room) {
        return;
      }
      this.newRoom(room);
    });
  }

  newRoom(room: Room): void {
    this.lobbyService.newRoom(room);
  }
}
