import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notes = [{
    'heading': 'Sushan Sapaliga',
    'description': 'My name is sushan, My name is sushan, My name is sushan, My name is sushan, My name is sushan, '
},{
  'heading': 'hello',
  'description': 'hello sub heading'
},{
  'heading': 'hello',
  'description': 'hello sub heading'
},{
  'heading': 'hello',
  'description': 'hello sub heading'
},{
  'heading': 'hello',
  'description': 'hello sub heading'
},{
  'heading': 'hello',
  'description': 'hello <p>sub</p> heading'
}];


testing = '<h1>Hello</h1>';

  constructor(private router: Router) { }

  ngOnInit(): void { 
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  getToNote(){
    this.router.navigate(['/note']);
  }

  logdetails(){
    console.log("hello");
  }
}
