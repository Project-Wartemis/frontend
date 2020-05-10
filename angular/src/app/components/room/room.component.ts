import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Client } from 'interfaces/client';
import { Lobby } from 'interfaces/lobby';
import { Room } from 'interfaces/room';
import { LobbyService } from 'services/lobby/lobby.service';
import { AddClientToRoomDialogComponent } from 'components/dialogs/add-client-to-room/add-client-to-room.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  lobby: Lobby;
  room: Room;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private lobbyService: LobbyService,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const roomKey = params.get('roomKey');
      this.subscriptions.push(this.lobbyService.lobby$.subscribe({
        next: lobby => {
          if(!lobby) {
            return;
          }
          this.lobby = lobby;
          this.room = lobby.rooms.find(r => r.key === roomKey);
        }
      }));
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientToRoomDialogComponent, {
      width: '250px',
      data: {clients: this.lobby.clients},
    });
    dialogRef.afterClosed().subscribe(client => {
      if(client) {
        this.addClient(client);
      }
    });
  }

  addClient(client: Client): void {
    this.lobbyService.addClientToRoom(this.room, client);
  }
}
