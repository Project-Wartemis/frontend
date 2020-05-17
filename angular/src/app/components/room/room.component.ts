import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Lobby, Room } from 'interfaces/base';
import { GameConquestMockService } from 'services/game/conquest/game-conquest-mock.service';
import { GameConquestStateService } from 'services/game/conquest/game-conquest-state.service';
import { RoomService } from 'services/room/room.service';
import { WebsocketService } from 'services/websocket/websocket.service';
import { AddBotToRoomDialogComponent } from 'components/dialogs/add-bot-to-room/add-bot-to-room.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [GameConquestStateService],
})
export class RoomComponent implements OnInit, OnDestroy {

  lobby: Lobby;
  room: Room;
  subscriptions: Subscription[] = [];
  connected: boolean;
  socketKey: string;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private gameConquestMockService: GameConquestMockService,
    private gameConquestStateService: GameConquestStateService,
    private roomService: RoomService,
    private websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const roomKey = params.get('roomKey');
      this.subscriptions.push(this.roomService.lobby$.subscribe({
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
    this.disconnect();
  }

  openDialogAddBot(): void {
    const dialogRef = this.dialog.open(AddBotToRoomDialogComponent, {
      width: '250px',
      data: {bots: this.lobby.clients.bot},
    });
    dialogRef.afterClosed().subscribe(bot => {
      if(bot) {
        this.roomService.addBotToRoom(this.room, bot);
      }
    });
  }

  connect(): void {
    this.socketKey = this.websocketService.connect(`socket/${this.room.key}`);
    // TODO add message handler for gamestate, for now simulate a random state
    // this.websocketService.registerMessageHandler(socketKey, 'gamestate', this.handleGameStateMessage.bind(this));
    const initialState = this.gameConquestMockService.generateInitial();
    this.gameConquestStateService.processNewState(initialState);
    window.setInterval(() => {
      const current = this.gameConquestStateService.getCurrentGameState();
      const next = this.gameConquestMockService.generate(current);
      this.gameConquestStateService.processNewState(next);
    }, 1000);

    this.connected = true;
  }

  disconnect(): void {
    if(!this.connected) {
      return;
    }
    this.websocketService.disconnect(this.socketKey);
    this.connected = false;
  }
}
