import { Component, OnInit, NgZone } from '@angular/core';
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


  isLoading: boolean;

  constructor(private router: Router, private ngZone: NgZone) {

    this.isLoading = false;

    
   }

  ngOnInit(): void { 
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  goToMorePage(){
    this.ngZone.run(() => this.router.navigate(['/more']));
  }

  getToNote(){
    this.ngZone.run(() => this.router.navigate(['/note']));
  }

  logdetails(){
    console.log("hello");
  }


}
