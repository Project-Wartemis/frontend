import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, timer, EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Lobby } from 'interfaces/lobby';
import { Room } from 'interfaces/room';
import { SnackbarService } from 'services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  lobby$: Observable<Lobby>;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
  ) {
    this.lobby$ = timer(0, 1000).pipe(
      mergeMap(() =>
        this.http.get<Lobby>('/api/lobby')
      )
    );
  }

  newRoom(room: Room): void {
    this.http.post<Room>('/api/room', room)
      .pipe(
        map(_ => this.newRoomSuccess(_)),
        catchError(_ => this.newRoomError(_))
      )
      .subscribe();
  }

  newRoomSuccess(room): Room {
    this.snackbarService.success(`Created game ${room.name}`);
    return room;
  }

  newRoomError(error: Error): Observable<never> {
    this.snackbarService.error('Creating the game failed, please try again', error);
    return EMPTY;
  }
}
