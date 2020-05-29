import { Component, Input, OnInit } from '@angular/core';

import { Game } from 'interfaces/base';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() public game: Game;
  public botCount = 0;
  public viewerCount = 0;

  constructor() { }

  ngOnInit(): void {
    this.botCount = this.game.clients.filter(client => client.type === 'bot').length;
    this.viewerCount = this.game.clients.filter(client => client.type === 'viewer').length;
  }

}
