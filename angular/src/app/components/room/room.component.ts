import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Client, Lobby, Room } from 'interfaces/base';
import { Message, StateMessage } from 'interfaces/message';
import { GameConquestStateService } from 'services/game/conquest/game-conquest-state.service';
import { GamePlanetWarsStateService } from 'services/game/planet-wars/game-planet-wars-state.service';
import { RoomService } from 'services/room/room.service';
import { WebsocketService } from 'services/websocket/websocket.service';
import { AddBotToRoomDialogComponent } from 'components/dialogs/add-bot-to-room/add-bot-to-room.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [
    GameConquestStateService,
    GamePlanetWarsStateService,
  ],
})
export class RoomComponent implements OnInit, OnDestroy {

  lobby: Lobby;
  lobbyBots: Client[] = [];
  room: Room;
  viewers: Client[] = [];
  bots: Client[] = [];
  engine: Client;
  subscriptions: Subscription[] = [];
  connected: boolean;
  socketKey: string;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private gameConquestStateService: GameConquestStateService,
    private gamePlanetWarsStateService: GamePlanetWarsStateService,
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
          this.lobbyBots = this.lobby.clients.filter(client => client.type === 'bot');
          this.room = lobby.rooms.find(r => r.id === roomId);
          this.viewers = this.room.clients.filter(client => client.type === 'viewer');
          this.bots = this.room.clients.filter(client => client.type === 'bot');
          this.engine = this.room.clients.find(client => client.type === 'engine');
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
      data: this.lobbyBots,
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

  stop(): void {
    this.websocketService.send(this.socketKey, {
      type: 'stop'
    } as Message);
  }

  handleStateMessage(key: string, raw: object): void {
    const message: StateMessage = Object.assign({} as StateMessage, raw);
    switch(this.engine.name) {
      case 'Conquest': this.gameConquestStateService.processNewState(message.state); break;
      case 'Planet Wars': this.gamePlanetWarsStateService.processNewState(message.state); break;
    }
  }
}
