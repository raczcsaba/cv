import { Injectable } from '@angular/core';
import { AppstatusInterface } from './appstatusInterface'
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppstatusService {

  constructor() { }
  data:AppstatusInterface = {internet:{closed:true, tray:true},folder:{closed:false, tray:true},calculator:{closed:false, tray:false},notepad:{closed:true, tray:true}}

  //1-ie 2-filemanager 3-calc 4-notepad
  focus = 0

  //datasending
  private messageSource = new BehaviorSubject(this.data);
  public currentMessage = this.messageSource.asObservable();

  changeMessage(message:AppstatusInterface) {
    this.data = message
    this.messageSource.next(message)
  }
  toggleOther(v:number){
    if (v==1){
      !this.data.folder.tray?this.focus=2:
        !this.data.calculator.tray?this.focus=3:
          !this.data.notepad.tray?this.focus=4:this.focus=0
      console.log(this.focus)
    }
    if (v==2){
      !this.data.internet.tray?this.focus=1:
        !this.data.calculator.tray?this.focus=3:
          !this.data.notepad.tray?this.focus=4:this.focus=0
      console.log(this.focus)
    }
    if (v==3){
      !this.data.internet.tray?this.focus=1:
        !this.data.folder.tray?this.focus=2:
          !this.data.notepad.tray?this.focus=4:this.focus=0
      console.log(this.focus)
    }
    if (v==4){
      !this.data.internet.tray?this.focus=1:
        !this.data.folder.tray?this.focus=2:
          !this.data.calculator.tray?this.focus=3:this.focus=0
      console.log(this.focus)
    }

  }
}
