// ----- EXTERNAL -----
// ANGULAR
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ----- MODULES -----
import { IconModule } from '@visurel/iconify-angular';
import { MaterialModule } from 'modules/material.module';
import { RoutingModule } from 'modules/routing.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// ----- COMPONENTS -----
import { AppComponent } from './app.component';
import { LobbyComponent } from 'components/lobby/lobby.component';
import { NewGameDialogComponent } from 'components/dialogs/new-game/new-game.component';
import { GameComponent } from './components/game/game.component';
import { AddBotToGameDialogComponent } from './components/dialogs/add-bot-to-game/add-bot-to-game.component';
import { SetNameDialogComponent } from './components/dialogs/set-name/set-name.component';
import { GameConquestComponent } from './components/game/conquest/game-conquest.component';
import { InviteDialogComponent } from './components/dialogs/invite/invite.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GamePlanetWarsComponent } from './components/game/planet-wars/game-planet-wars.component';
import { DocsIntroComponent } from './components/docs/intro/intro.component';
import { DocsGameConquestComponent } from './components/docs/game/conquest/conquest.component';
import { DocsGamePlanetWarsComponent } from './components/docs/game/planet-wars/planet-wars.component';
import { DocsStartJavascriptComponent } from './components/docs/start/javascript/javascript.component';
import { DocsStartPythonComponent } from './components/docs/start/python/python.component';
import { DocsScratchComponent } from './components/docs/scratch/scratch.component';
import { DocsComponent } from './components/docs/docs.component';
import { GameTicTacToeComponent } from './components/game/tic-tac-toe/game-tic-tac-toe.component';
import { DocsGameTicTacToeComponent } from './components/docs/game/tic-tac-toe/tic-tac-toe.component';
import { DocsStartGoComponent } from './components/docs/start/go/go.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    NewGameDialogComponent,
    GameComponent,
    AddBotToGameDialogComponent,
    SetNameDialogComponent,
    GameConquestComponent,
    InviteDialogComponent,
    GameCardComponent,
    GamePlanetWarsComponent,
    DocsIntroComponent,
    DocsGameConquestComponent,
    DocsGamePlanetWarsComponent,
    DocsStartJavascriptComponent,
    DocsStartPythonComponent,
    DocsScratchComponent,
    DocsComponent,
    GameTicTacToeComponent,
    DocsGameTicTacToeComponent,
    DocsStartGoComponent,
  ],
  imports: [
    // ----- EXTERNAL -----
    // ANGULAR
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    // ----- MODULES -----
    IconModule,
    MaterialModule,
    RoutingModule,
    ScrollToModule.forRoot(),
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
