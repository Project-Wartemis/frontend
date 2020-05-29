import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Client, Game, Lobby } from 'interfaces/base';
import { Message, HistoryMessage, JoinMessage, LeaveMessage, StateMessage } from 'interfaces/message';
import { GameConquestStateService } from 'services/game/conquest/game-conquest-state.service';
import { GamePlanetWarsStateService } from 'services/game/planet-wars/game-planet-wars-state.service';
import { LobbyService } from 'services/lobby/lobby.service';
import { WebsocketService } from 'services/websocket/websocket.service';
import { AddBotToGameDialogComponent } from 'components/dialogs/add-bot-to-game/add-bot-to-game.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [
    GameConquestStateService,
    GamePlanetWarsStateService,
  ],
})
export class GameComponent implements OnInit, OnDestroy {

  private gameId: number;
  lobby: Lobby;
  game: Game;
  validBots: Array<Client> = [];
  subscriptions: Array<Subscription> = [];
  messageHandlers: Array<string> = [];
  // playback
  history: Array<StateMessage> = [];
  turn = 1;
  playing = true;
  speed = 50;
  shouldStart = true;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private gameConquestStateService: GameConquestStateService,
    private gamePlanetWarsStateService: GamePlanetWarsStateService,
    private lobbyService: LobbyService,
    private websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ngOnDestroy();
      this.gameId = Number(params.get('gameId'));
      this.websocketService.send({
        type: 'join',
        game: this.gameId
      } as JoinMessage);
      this.subscriptions.push(this.lobbyService.lobby$.subscribe({
        next: this.updateLobby.bind(this)
      }));
    });
    this.messageHandlers.push(
      this.websocketService.registerMessageHandler('state', this.handleStateMessage.bind(this))
    );
    this.messageHandlers.push(
      this.websocketService.registerMessageHandler('history', this.handleHistoryMessage.bind(this))
    );
  }

  ngOnDestroy(): void {
    if(this.gameId) {
      this.websocketService.send({
        type: 'leave',
        game: this.gameId
      } as LeaveMessage);
    }
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
    this.messageHandlers.forEach(messageHandler => this.websocketService.deregisterMessageHandler(messageHandler));
    this.messageHandlers = [];
  }

  private updateLobby(lobby: Lobby): void {
    if(!lobby) {
      return;
    }
    this.lobby = lobby;
    this.game = this.lobby.games.find(g => g.id === this.gameId);
    if(this.game?.engine) {
      this.validBots = this.lobby.bots.filter(b => b.game === this.game.engine.name);
    }
  }

  public openDialogAddBot(): void {
    const dialogRef = this.dialog.open(AddBotToGameDialogComponent, {
      width: '250px',
      data: this.validBots,
    });
    dialogRef.afterClosed().subscribe(bot => {
      if(bot) {
        this.lobbyService.addBotToGame(this.game, bot);
      }
    });
  }

  public startGame(): void {
    this.websocketService.send({
      type: 'start',
      game: this.gameId
    } as Message);
  }

  private handleStateMessage(raw: object): void {
    const message: StateMessage = Object.assign({} as StateMessage, raw);
    if(message.game !== this.gameId) {
      return;
    }
    this.history[message.turn] = message;
    if(this.shouldStart) {
      this.broadcastTurn();
    }
  }

  private handleHistoryMessage(raw: object): void {
    const message: HistoryMessage = Object.assign({} as HistoryMessage, raw);
    for(const m of message.messages) {
      if(m.game !== this.gameId) {
        continue;
      }
      this.history[m.turn] = m;
    }
    if(this.shouldStart) {
      this.broadcastTurn();
    }
  }

  // playback

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
    switch(this.game.engine.name) {
      case 'Conquest':    this.gameConquestStateService  .processNewState(state); break;
      case 'Planet Wars': this.gamePlanetWarsStateService.processNewState(state); break;
    }
  }
}
