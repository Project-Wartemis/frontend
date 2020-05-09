import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbyComponent } from 'components/lobby/lobby.component';

const routes: Routes = [
  { path: '', component: LobbyComponent },
  // { path: 'game/:gameId', component: LobbyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
