import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Lobby, Room } from 'interfaces/base';
import { Message, StateMessage } from 'interfaces/message';
import { GameState } from 'interfaces/game/conquest';
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
  started: boolean;
  socketKey: string;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private gameConquestStateService: GameConquestStateService,
    private roomService: RoomService,
    private websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ngOnDestroy();
      const roomId = Number(params.get('roomId'));
      this.subscriptions.push(this.roomService.lobby$.subscribe({
        next: lobby => {
          if(!lobby) {
            return;
          }
          this.lobby = lobby;
          this.room = lobby.rooms.find(r => r.id === roomId);
          if(!this.connected) {
            this.connect();
          }
        }
      }));
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
    this.disconnect();
  }

  openDialogAddBot(): void {
    const dialogRef = this.dialog.open(AddBotToRoomDialogComponent, {
      width: '250px',
      data: this.lobby.clients.bot,
    });
    dialogRef.afterClosed().subscribe(bot => {
      if(bot) {
        this.roomService.addBotToRoom(this.room, bot);
      }
    });
  }

  connect(): void {
    this.socketKey = this.websocketService.connect(`socket/${this.room.id}`);
    this.websocketService.registerMessageHandler(this.socketKey, 'state', this.handleStateMessage.bind(this));
    this.connected = true;
  }

  disconnect(): void {
    if(!this.connected) {
      return;
    }
    this.websocketService.disconnect(this.socketKey);
    this.connected = false;
  }

  start(): void {
    this.websocketService.send(this.socketKey, {
      type: 'start'
    } as Message);
  }

  handleStateMessage(key: string, raw: object): void {
    this.started = true;
    const message: StateMessage = Object.assign({} as StateMessage, raw);
    // TODO change - for now it is assumed we only have the conquest game type
    const state: GameState = Object.assign({} as GameState, message.state);
    console.log(state);
    this.gameConquestStateService.processNewState(state);
  }
}
