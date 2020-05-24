import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { Client, Lobby, Room } from 'interfaces/base';
import { CreatedMessage, InviteMessage, LobbyMessage, RoomMessage } from 'interfaces/message';
import { ColorService } from 'services/color/color.service';
import { HttpService } from 'services/http/http.service';
import { InviteService } from 'services/invite/invite.service';
import { WebsocketService } from 'services/websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public lobby$: BehaviorSubject<Lobby>;
  private lobbySocketKey: string;

  constructor(
    private http: HttpService,
    private router: Router,
    private colorService: ColorService,
    private inviteService: InviteService,
    private websocketService: WebsocketService,
  ) {
    this.lobby$ = new BehaviorSubject<Lobby>(null);
    this.lobbySocketKey = this.websocketService.connect('socket');
    websocketService.registerMessageHandler(this.lobbySocketKey, 'created', this.handleCreatedMessage.bind(this));
    websocketService.registerMessageHandler(this.lobbySocketKey, 'invite',  this.handleInviteMessage.bind(this));
    websocketService.registerMessageHandler(this.lobbySocketKey, 'lobby',   this.handleLobbyMessage.bind(this));
  }

  public newRoom(name: string, engine: Client): void {
    this.websocketService.send(this.lobbySocketKey, {
      type: 'room',
      name,
      engine: engine.id
    } as RoomMessage);
  }

  public addBotToRoom(room: Room, bot: Client): void {
    this.websocketService.send(this.lobbySocketKey, {
      type: 'invite',
      room: room.id,
      client: bot.id
    } as InviteMessage);
  }

  private handleCreatedMessage(key: string, raw: object): void {
    const message: CreatedMessage = Object.assign({} as CreatedMessage, raw);
    this.router.navigate(['/room', message.room]);
  }

  private handleInviteMessage(key: string, raw: object): void {
    const message: InviteMessage = Object.assign({} as InviteMessage, raw);
    this.inviteService.addInvite({
      id: message.room,
      name: message.name
    } as Room);
  }

  private handleLobbyMessage(key: string, raw: object): void {
    const message: LobbyMessage = Object.assign({} as LobbyMessage, raw);
    this.enhanceRoom(message.lobby, false);
    for(const room of message.lobby.rooms) {
      this.enhanceRoom(room);
    }
    this.lobby$.next(message.lobby);
  }

  private enhanceRoom(room: Room, assignColors: boolean = true): void {
    room.bots = room.clients.filter(client => client.type === 'bot');
    room.engines = room.clients.filter(client => client.type === 'engine');
    room.players = room.clients.filter(client => client.type === 'player');
    room.viewers = room.clients.filter(client => client.type === 'viewer');
    if(assignColors) {
      room.bots.forEach((b, i) => b.color = this.colorService.getColor(i));
      room.players.forEach((b, i) => b.color = this.colorService.getColor(i));
    }
  }
}
