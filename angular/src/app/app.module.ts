// ----- EXTERNAL -----
// ANGULAR
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ----- MODULES -----
import { MaterialModule } from './material/app-material.module';
import { AppRoutingModule } from './routing/app-routing.module';
// ----- COMPONENTS -----
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    // ----- EXTERNAL -----
    // ANGULAR
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    // ----- MODULES -----
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
