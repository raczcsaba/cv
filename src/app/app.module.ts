import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { NavbarComponent } from './navbar/navbar.component';
import { WindowComponent } from './window/window.component';
import {ResizableModule} from "angular-resizable-element";
import { InternetComponent } from './internet/internet.component';
import { FolderComponent } from './folder/folder.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { NotepadComponent } from './notepad/notepad.component';
import {MatIconModule} from "@angular/material/icon";
import {NgRickRollModule} from "ng-rick-roll";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatMenuModule} from "@angular/material/menu";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WindowComponent,
    InternetComponent,
    FolderComponent,
    CalculatorComponent,
    NotepadComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ResizableModule,
    MatIconModule,
    NgRickRollModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
