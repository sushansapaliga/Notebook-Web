import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb:FormBuilder, private router: Router, public authService: AuthService) {
    this.loginForm =this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]]
    });
   }

  errorText?: String ;
  isError?: boolean ;
  loading?: boolean;
  loginForm?: FormGroup;
  logInBtnText: string;

  ngOnInit(): void {
    this.errorText = "";
    this.isError = false;
    this.loading = false;
    this.logInBtnText = 'Log In';

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    /* logout if incase the user is logged-in */
    this.authService.logOut();
  }

  login(){

    if(this.loading){
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loading = true;
    this.logInBtnText = 'Logging In...';

    this.authService.logIn(email, password)
    .then((result)=>{
      this.router.navigate(['/home']);
      this.loading = false;
      this.logInBtnText = 'Log In';
    })
    .catch((errorText)=>{
      this.errorText = errorText;
      this.loading = false;
      this.logInBtnText = 'Log In';
      this.isError = true;
    })
  }

  goToSignUpPage(){
    this.router.navigate(['/signup']);
  }

}
