import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { Game } from '../game/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games$: Observable<Game[]>;

  constructor(
    private http: HttpClient
  ) {
    this.games$ = timer(0, 1000).pipe(
      concatMap(() => this.http.get<Game[]>('/assets/temp.json'))
    );
  }
}
