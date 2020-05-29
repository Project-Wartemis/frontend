// ----- EXTERNAL -----
// ANGULAR
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ----- MODULES -----
import { MaterialModule } from 'modules/material.module';
import { RoutingModule } from 'modules/routing.module';
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
    MaterialModule,
    RoutingModule,
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
