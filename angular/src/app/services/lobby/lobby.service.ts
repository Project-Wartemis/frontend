import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, timer, EMPTY, BehaviorSubject } from 'rxjs';
import { catchError, concatMap , map } from 'rxjs/operators';

import { Client } from 'interfaces/client';
import { Lobby } from 'interfaces/lobby';
import { Room } from 'interfaces/room';
import { SnackbarService } from 'services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  lobby$: BehaviorSubject<Lobby>;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
  ) {
    this.lobby$ = new BehaviorSubject<Lobby>(null);
    timer(0, 1000).pipe(
      concatMap (() =>
        this.http.get<Lobby>('/api/lobby')
      )
    ).subscribe(this.lobby$);
  }

  newRoom(room: Room): void {
    this.http.post<Room>('/api/room', room)
      .pipe(
        map(_ => this.newRoomSuccess(_)),
        catchError(_ => this.newRoomError(_))
      )
      .subscribe();
  }

  newRoomSuccess(room: Room): Room {
    this.snackbarService.success(`Created game ${room.name}`);
    return room;
  }

  newRoomError(error: Error): Observable<never> {
    this.snackbarService.error('Creating the game failed, please try again', error);
    return EMPTY;
  }

  addClientToRoom(room: Room, client: Client): void {
    this.http.post<Client>(`/api/room/${room.key}/client`, JSON.stringify(client.key))
      .pipe(
        map(_ => this.addClientToRoomSuccess(_)),
        catchError(_ => this.addClientToRoomError(_))
      )
      .subscribe();
  }

  addClientToRoomSuccess(client: Client): Client {
    this.snackbarService.success(`Added ${client.name} to game!`);
    return client;
  }

  addClientToRoomError(error: Error): Observable<never> {
    this.snackbarService.error('Adding the bot to the game failed, please try again', error);
    return EMPTY;
  }
}
