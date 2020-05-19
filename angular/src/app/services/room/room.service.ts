import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Client, Lobby, Room } from 'interfaces/base';
import { InviteMessage, LobbyMessage, RoomMessage } from 'interfaces/message';
import { HttpService } from 'services/http/http.service';
import { SnackbarService } from 'services/snackbar/snackbar.service';
import { WebsocketService } from 'services/websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public lobby$: BehaviorSubject<Lobby>;
  private lobbySocketKey: string;

  constructor(
    private http: HttpService,
    private snackbarService: SnackbarService,
    private websocketService: WebsocketService,
  ) {
    this.lobby$ = new BehaviorSubject<Lobby>(null);
    this.lobbySocketKey = this.websocketService.connect('socket');
    websocketService.registerMessageHandler(this.lobbySocketKey, 'invite', this.handleInviteMessage.bind(this));
    websocketService.registerMessageHandler(this.lobbySocketKey, 'lobby',  this.handleLobbyMessage.bind(this));
  }

  public newRoom(name: string, engine: Client): void {
    console.log('doing stuff');
    this.websocketService.send(this.lobbySocketKey, {
      type: 'room',
      name,
      engine: engine.id
    } as RoomMessage);
  }

  public addClientToRoom(room: Room, client: Client): void {
    this.websocketService.send(this.lobbySocketKey, {
      type: 'invite',
      room: room.id,
      client: client.id
    } as InviteMessage);
  }

  private handleLobbyMessage(key: string, raw: object): void {
    const message: LobbyMessage = Object.assign({} as LobbyMessage, raw);
    this.lobby$.next(message.lobby);
  }

  private handleInviteMessage(key: string, raw: object): void {
    const message: InviteMessage = Object.assign({} as InviteMessage, raw);
    alert(`You just got invited to game ${message.room} - TODO show a popup`);
  }
}
