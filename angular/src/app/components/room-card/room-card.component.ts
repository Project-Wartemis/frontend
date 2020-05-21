import { Component, Input } from '@angular/core';

import { Room } from 'interfaces/base';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent {

  @Input() public room: Room;

  constructor() { }

}
