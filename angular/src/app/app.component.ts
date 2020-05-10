import { Component, OnInit } from '@angular/core';

import { Lobby } from 'interfaces/lobby';
import { LobbyService } from 'services/lobby/lobby.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lobby: Lobby;

  constructor(
    private lobbyService: LobbyService,
  ) { }

  ngOnInit(): void {
    this.lobbyService.lobby$.subscribe({
      next: lobby => this.lobby = lobby
    });
  }

  pluralize(count: number, singular: string, plural: string): string {
    if(count === 1) {
      return count + ' ' + singular;
    }
    return count + ' ' + plural;
  }
}
