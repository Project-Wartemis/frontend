import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { Client, Game, Lobby, Room } from 'interfaces/base';
import { CreatedMessage, GameMessage, InviteMessage, LobbyMessage } from 'interfaces/message';
import { ColorService } from 'services/color/color.service';
import { HttpService } from 'services/http/http.service';
import { InviteService } from 'services/invite/invite.service';
import { WebsocketService } from 'services/websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  public lobby$: BehaviorSubject<Lobby>;

  constructor(
    private http: HttpService,
    private router: Router,
    private colorService: ColorService,
    private inviteService: InviteService,
    private websocketService: WebsocketService,
  ) {
    this.lobby$ = new BehaviorSubject<Lobby>(null);
    websocketService.registerMessageHandler('created', this.handleCreatedMessage.bind(this));
    websocketService.registerMessageHandler('lobby',   this.handleLobbyMessage.bind(this));
  }

  public newGame(name: string, engine: Client): void {
    this.websocketService.send({
      type: 'game',
      name,
      engine: engine.id
    } as GameMessage);
  }

  public addBotToGame(game: Game, bot: Client): void {
    this.websocketService.send({
      type: 'invite',
      game: game.id,
      bot: bot.id
    } as InviteMessage);
  }

  private handleCreatedMessage(raw: object): void {
    const message: CreatedMessage = Object.assign({} as CreatedMessage, raw);
    this.router.navigate(['/game', message.game]);
  }

  private handleLobbyMessage(raw: object): void {
    const message: LobbyMessage = Object.assign({} as LobbyMessage, raw);
    this.enhanceRoom(message.lobby);
    for(const game of message.lobby.games) {
      this.enhanceRoom(game);
    }
    this.lobby$.next(message.lobby);
  }

  private enhanceRoom(room: Room): void {
    room.bots = room.clients.filter(client => client.type === 'bot');
    room.engines = room.clients.filter(client => client.type === 'engine');
    room.viewers = room.clients.filter(client => client.type === 'viewer');
    if(this.isLobby(room)) {
      for(const game of room.games) {
        this.enhanceRoom(game);
      }
    }
    if(this.isGame(room)) {
      room.players.forEach((p, i) => p.color = this.colorService.getColor(i));
    }
  }

  private isLobby(room: Room): room is Lobby {
    return (room as Lobby).games !== undefined;
  }

  private isGame(room: Room): room is Game {
    return (room as Game).players !== undefined;
  }
}
