import { Injectable } from '@angular/core';
import { AppstatusInterface } from './appstatusInterface'
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppstatusService {

  constructor() { }
  data:AppstatusInterface = {internet:{closed:false, tray:true},folder:{closed:true, tray:false},calculator:{closed:true, tray:false},notepad:{closed:true, tray:false}}

  //datasending
  private messageSource = new BehaviorSubject(this.data);
  public currentMessage = this.messageSource.asObservable();

  changeMessage(message:AppstatusInterface) {

    this.messageSource.next(message)
  }
}
