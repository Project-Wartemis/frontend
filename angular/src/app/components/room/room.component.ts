import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Lobby, Room } from 'interfaces/base';
import { Message, HistoryMessage, StateMessage, } from 'interfaces/message';
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
  room: Room;
  subscriptions: Subscription[] = [];
  connected: boolean;
  socketKey: string;
  // playback
  history: StateMessage[] = [];
  turn = 1;
  playing = true;
  speed = 50;
  shouldStart = true;

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
          this.room = lobby.rooms.find(r => r.id === roomId);
          if(this.room && !this.connected) {
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
      data: this.lobby.bots,
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
    this.websocketService.registerMessageHandler(this.socketKey, 'history', this.handleHistoryMessage.bind(this));
    this.connected = true;
  }

  disconnect(): void {
    if(!this.connected) {
      return;
    }
    this.websocketService.disconnect(this.socketKey);
    this.connected = false;
  }

  startGame(): void {
    this.websocketService.send(this.socketKey, {
      type: 'start'
    } as Message);
  }

  handleStateMessage(key: string, raw: object): void {
    const message: StateMessage = Object.assign({} as StateMessage, raw);
    this.history[message.turn] = message;
    if(this.shouldStart) {
      this.broadcastTurn();
    }
  }

  handleHistoryMessage(key: string, raw: object): void {
    const message: HistoryMessage = Object.assign({} as HistoryMessage, raw);
    for(const m of message.messages) {
      this.history[m.turn] = m;
    }
    if(this.shouldStart) {
      this.broadcastTurn();
    }
  }

  start(): void {
    this.turn = 1;
    this.playing = false;
    this.broadcastTurn();
  }

  back(): void {
    this.turn -= 5;
    if(this.turn < 1) {
      this.turn = 1;
    }
    this.playing = false;
    this.broadcastTurn();
  }

  togglePlaying(): void {
    if(this.turn < this.history.length) {
      this.playing = !this.playing;
    }
    if(this.playing) {
      this.broadcastTurn();
    }
  }

  forward(): void {
    this.turn += 5;
    if(this.turn > this.history.length) {
      this.turn = this.history.length;
    }
    this.playing = false;
    this.broadcastTurn();
  }

  end(): void {
    this.turn = this.history.length;
    this.playing = false;
    this.broadcastTurn();
  }

  turnEnd(): void {
    if(this.turn >= this.history.length) {
      this.shouldStart = true;
      return;
    }
    if(this.playing) {
      this.turn++;
      this.broadcastTurn();
    }
  }

  broadcastTurn(): void {
    this.shouldStart = false;
    const state = this.history[this.turn - 1].state;
    switch(this.room.engines[0].name) {
      case 'Conquest':    this.gameConquestStateService  .processNewState(state); break;
      case 'Planet Wars': this.gamePlanetWarsStateService.processNewState(state); break;
    }
  }
}
