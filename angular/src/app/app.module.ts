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
import { NewRoomDialogComponent } from 'components/dialogs/new-room/new-room.component';
import { RoomComponent } from './components/room/room.component';
import { AddBotToRoomDialogComponent } from './components/dialogs/add-bot-to-room/add-bot-to-room.component';
import { SetNameDialogComponent } from './components/dialogs/set-name/set-name.component';
import { GameConquestComponent } from './components/game/conquest/game-conquest.component';
import { InviteDialogComponent } from './components/dialogs/invite/invite.component';
import { RoomCardComponent } from './components/room-card/room-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    NewRoomDialogComponent,
    RoomComponent,
    AddBotToRoomDialogComponent,
    SetNameDialogComponent,
    GameConquestComponent,
    InviteDialogComponent,
    RoomCardComponent,
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
