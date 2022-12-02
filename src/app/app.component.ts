import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cv';

  clickVal = false

  click() {
    this.clickVal = !this.clickVal

  }
}
