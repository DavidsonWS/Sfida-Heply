import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent, GameComponent } from './_components/pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementDragDirective } from './_directives';
import { ExaminerComponent } from './_components/examiner/examiner.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GameComponent,
    ElementDragDirective,
    ExaminerComponent
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
