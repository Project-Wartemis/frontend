import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbyComponent } from 'components/lobby/lobby.component';
import { RoomComponent } from 'components/room/room.component';

const routes: Routes = [
  { path: '', component: LobbyComponent },
  { path: 'room/:roomId', component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
