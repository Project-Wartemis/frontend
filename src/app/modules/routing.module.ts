import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from 'components/docs/docs.component';
import { DocsIntroComponent } from 'components/docs/intro/intro.component';
import { DocsGameConquestComponent } from 'components/docs/game/conquest/conquest.component';
import { DocsGamePlanetWarsComponent } from 'components/docs/game/planet-wars/planet-wars.component';
import { DocsGameTicTacToeComponent } from 'components/docs/game/tic-tac-toe/tic-tac-toe.component';
import { DocsScratchComponent } from 'components/docs/scratch/scratch.component';
import { DocsStartGoComponent } from 'components/docs/start/go/go.component';
import { DocsStartJavascriptComponent } from 'components/docs/start/javascript/javascript.component';
import { DocsStartPythonComponent } from 'components/docs/start/python/python.component';
import { GameComponent } from 'components/game/game.component';
import { LobbyComponent } from 'components/lobby/lobby.component';

const routes: Routes = [
  { path: '', component: LobbyComponent },
  { path: 'game/:gameId', component: GameComponent },
  {
    path: 'docs',
    component: DocsComponent,
    children: [{
      path: '',
      component: DocsIntroComponent
    }, {
      path: 'scratch',
      component: DocsScratchComponent
    }, {
      path: 'game/conquest',
      component: DocsGameConquestComponent
    }, {
      path: 'game/planetwars',
      component: DocsGamePlanetWarsComponent
    }, {
      path: 'game/tictactoe',
      component: DocsGameTicTacToeComponent
    }, {
      path: 'start/go',
      component: DocsStartGoComponent
    }, {
      path: 'start/javascript',
      component: DocsStartJavascriptComponent
    }, {
      path: 'start/python',
      component: DocsStartPythonComponent
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes/*, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }*/),
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
