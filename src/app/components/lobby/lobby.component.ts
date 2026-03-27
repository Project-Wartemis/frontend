import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { Game, Lobby } from 'interfaces/base';
import { LobbyService } from 'services/lobby/lobby.service';
import { NewGameDialogComponent } from 'components/dialogs/new-game/new-game.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {

  lobby: Lobby;
  games: {
    open: Game[];
    started: Game[];
    finished: Game[];
  } = {
    open: [],
    started: [],
    finished: [],
  };
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private lobbyService: LobbyService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.lobbyService.lobby$.subscribe({
      next: this.updateLobby.bind(this)
    }));
  }

  private updateLobby(lobby: Lobby): void {
    if(!lobby) {
      return;
    }
    this.lobby = lobby;
    this.games.open = this.lobby.games.filter(room => !room.started);
    this.games.started = this.lobby.games.filter(room => room.started && !room.stopped);
    this.games.finished = this.lobby.games.filter(room => room.stopped);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public openDialogNewGame(): void {
    const dialogRef = this.dialog.open(NewGameDialogComponent, {
      width: '250px',
      data: this.lobby.engines,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.lobbyService.newGame(result.name, result.engine);
      }
    });
  }
}
