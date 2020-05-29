import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbyComponent } from 'components/lobby/lobby.component';
import { GameComponent } from 'components/game/game.component';

const routes: Routes = [
  { path: '', component: LobbyComponent },
  { path: 'game/:gameId', component: GameComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
