import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Game } from '../game/game';
import { GamesService } from '../games/games.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  games$: Observable<Game[]>;

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.games$;
  }

}
