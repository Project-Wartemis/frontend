import { Component, Input, OnInit } from '@angular/core';

import { Room } from 'interfaces/base';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {

  @Input() public room: Room;
  public botCount = 0;
  public viewerCount = 0;

  constructor() { }

  ngOnInit(): void {
    this.botCount = this.room.clients.filter(client => client.type === 'bot').length;
    this.viewerCount = this.room.clients.filter(client => client.type === 'viewer').length;
  }

}
