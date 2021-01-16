import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ElementDragDirective } from './_directives';
import { ExaminerComponent, WelcomeComponent, GameComponent } from './_components';
import { EndGamePopupComponent } from './_components/end-game-popup/end-game-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GameComponent,
    ElementDragDirective,
    ExaminerComponent,
    EndGamePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
