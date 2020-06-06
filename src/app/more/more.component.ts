import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService, private ngZone: NgZone) { }

  ngOnInit(): void {
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  logout(){
    this.authService.logOut().then((result)=>{
      this.router.navigate(['/login']);
    });
  }

  goToHomePage(){
    this.ngZone.run(() => this.router.navigate(['/home']));
  }

  goToMyAccountPage(){
    this.ngZone.run(() => this.router.navigate(['/account']));
  }

  goToContactUsPage(){
    this.ngZone.run(() => this.router.navigate(['/contact']));
  }

}
