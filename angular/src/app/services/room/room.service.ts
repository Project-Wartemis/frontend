import { Injectable } from '@angular/core';

import { timer, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, concatMap , map } from 'rxjs/operators';

import { Client, Lobby, Room } from 'interfaces/base';
import { HttpService } from 'services/http/http.service';
import { SnackbarService } from 'services/snackbar/snackbar.service';
import { WebsocketService } from 'services/websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public lobby$: BehaviorSubject<Lobby>;

  constructor(
    private http: HttpService,
    private snackbarService: SnackbarService,
    private websocketService: WebsocketService,
  ) {
    this.lobby$ = new BehaviorSubject<Lobby>(null);
    timer(0, 1000).pipe(
      concatMap (() =>
        this.http.get<Lobby>('lobby')
      )
    ).subscribe(this.lobby$);

    this.websocketService.connect('socket');
    // TODO add message handlers
  }

  public newRoom(room: Room): void {
    this.http.post<Room>('room', room)
      .pipe(
        map((result: Room) => {
          this.snackbarService.success(`Created game ${result.name}`);
          return result;
        }),
        catchError((error: Error) => {
          this.snackbarService.error('Creating the game failed, please try again', error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  public addBotToRoom(room: Room, bot: Client): void {
    this.http.post<Client>(`room/${room.key}/bot`, JSON.stringify(bot.key))
      .pipe(
        map((result: Client) => {
          this.snackbarService.success(`Added ${result.name} to game!`);
          return result;
        }),
        catchError((error: Error) => {
          this.snackbarService.error('Adding the bot to the game failed, please try again', error);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
