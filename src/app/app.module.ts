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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WindowComponent,
    InternetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ResizableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
