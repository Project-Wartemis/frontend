import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Client, Lobby, Room } from 'interfaces/base';
import { InviteMessage, LobbyMessage, RoomMessage } from 'interfaces/message';
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
    private inviteService: InviteService,
    private websocketService: WebsocketService,
  ) {
    this.lobby$ = new BehaviorSubject<Lobby>(null);
    this.lobbySocketKey = this.websocketService.connect('socket');
    websocketService.registerMessageHandler(this.lobbySocketKey, 'invite', this.handleInviteMessage.bind(this));
    websocketService.registerMessageHandler(this.lobbySocketKey, 'lobby',  this.handleLobbyMessage.bind(this));
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

  private handleLobbyMessage(key: string, raw: object): void {
    const message: LobbyMessage = Object.assign({} as LobbyMessage, raw);
    this.lobby$.next(message.lobby);
  }

  private handleInviteMessage(key: string, raw: object): void {
    const message: InviteMessage = Object.assign({} as InviteMessage, raw);
    this.inviteService.addInvite({
      id: message.room,
      name: message.name
    } as Room);
  }
}
