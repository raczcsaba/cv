import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public now: Date = new Date();

  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 100);
  }

  toggleStart = false;

  ngOnInit(): void {

  }

  starToggle() {
    this.toggleStart = !this.toggleStart;
  }

}
