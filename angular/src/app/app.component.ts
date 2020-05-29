import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Lobby } from 'interfaces/base';
import { LobbyService } from 'services/lobby/lobby.service';
import { SessionService } from 'services/session/session.service';
import { SetNameDialogComponent } from 'components/dialogs/set-name/set-name.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lobby: Lobby;

  constructor(
    private dialog: MatDialog,
    public sessionService: SessionService,
    private lobbyService: LobbyService,
  ) { }

  ngOnInit(): void {
    this.lobbyService.lobby$.subscribe({
      next: lobby => this.lobby = lobby
    });
    if(!this.sessionService.name$.getValue()) {
      this.openDialogSetName();
    }
  }

  pluralize(count: number, singular: string, plural: string): string {
    if(count === 1) {
      return count + ' ' + singular;
    }
    return count + ' ' + plural;
  }

  openDialogSetName(): void {
    const dialogRef = this.dialog.open(SetNameDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(name => {
      if(name) {
        this.sessionService.setName(name);
      }
    });
  }
}
