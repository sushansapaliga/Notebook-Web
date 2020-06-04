import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLoggedIn?: boolean;
  userName?: String;

  constructor() { }

  ngOnInit(): void {

    this.userLoggedIn = true;
    this.userName = 'Sushan'
  }

}
