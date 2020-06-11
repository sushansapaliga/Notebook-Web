import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLoggedIn?: boolean;
  userName?: String;
  isLoading: boolean;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
  }

  ngOnInit(): void {

    this.isLoading = true;

    this.afAuth.onAuthStateChanged(user=>{

      this.isLoading = true;

      if(user ){

        this.userLoggedIn = true;
        this.userName = user.displayName;
        this.isLoading = false;
      }else{
  
        this.userLoggedIn = false;
        this.userName = null; 
        this.isLoading = false;
      }
    });

    this.afAuth.authState.subscribe((user)=>{
      this.isLoading = false;
    });
  }

}
