import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AppstatusService} from "../appstatus.service";
import {ResizeEvent} from "angular-resizable-element";
import * as math from "mathjs";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  constructor(public dataService : AppstatusService,) {
  }

  kocka: {'height':number,'width':number,'top':number,'bottom':number,'left':number,'right':number} = {height:300,width:340,top:14,bottom:0,left:14,right:0,};
  fullToggle = false;
  @Input() height?: number
  @Input() width?: number
  @ViewChild('rect') rect?: ElementRef;
  firstNum = 0;
  SecondNum = 0;
  operator = '?'

  ngOnChanges(){
    if (this.height && this.width){
      if (this.height<this.kocka.height){
        this.kocka.height = this.height - 10
      }
      if (this.width<this.kocka.width){
        this.kocka.width = this.width - 10
      }
      if (this.height<140 || this.width<332){
        this.close()
      }
    }
  }
  onResizeEnd($event: ResizeEvent) {
    this.kocka.width = ($event.rectangle.width??400);
    this.kocka.height = ($event.rectangle.height??300);
    this.kocka.top = $event.rectangle.top??80;
    this.kocka.bottom = $event.rectangle.bottom??0;
    this.kocka.left = $event.rectangle.left??80;
    this.kocka.right = $event.rectangle.right??0;

  }

  fullScreen() {
    this.fullToggle = !this.fullToggle;
    this.dataService.focus = 3
  }

  tray() {
    this.dataService.data.calculator.tray = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(3)

  }

  close() {
    this.dataService.data.calculator.closed = true;
    this.dataService.data.calculator.tray = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(3)

  }

  validate(event: ResizeEvent): boolean {
    //border
    //transform coords
    let transx
    transx = Number(getComputedStyle(this.rect?.nativeElement).transform.split(',')[4]??0)
    let transy
    transy = getComputedStyle(this.rect?.nativeElement).transform.split(',')[5]
    transy = transy?Number(transy.slice(0,-1)):0

    //nullish check
    this.width = this.width??0
    this.height = this.height??0

    //sides maxim??lis m??retprobl??ma
    if (transx + event.rectangle.right - 13 > this.width){
      return false
    }
    if (transy + event.rectangle.bottom - 13 > this.height){
      return false
    }
    if (transy + event.rectangle.top < 14){
      return false
    }
    if (transx + event.rectangle.left < 13){
      return false
    }

    //min max size check
    const minwidth: number = 332;
    const minheight: number = 100;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < minwidth ||
        event.rectangle.height < minheight)
    ) {
      return false;
    }
    return true;
  }
  focus() {
    this.dataService.focus = 3
  }

  changeFirst(value: string) {
    this.firstNum = Number(value)
  }

  changeSecond(value: string) {
    this.SecondNum = Number(value)
  }

  number(n: string) {
    this.SecondNum = Number(String(this.SecondNum) + n);
    console.log(this.SecondNum)
  }

  mathEvent(s: string) {
    if (this.firstNum!=0){
      this.firstNum = math.evaluate(this.firstNum + "" + this.operator + "" + this.SecondNum)
      this.SecondNum = 0
      this.operator = s
      if (s=='?'){
        this.SecondNum = this.firstNum;
        this.firstNum = 0
      }
    }
    else {
      this.firstNum = this.SecondNum
      this.SecondNum = 0
      this.operator = s
    }
  }

  restat() {
    this.operator = '?'
    this.firstNum = 0
    this.SecondNum = 0
  }
}
