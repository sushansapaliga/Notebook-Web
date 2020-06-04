import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb:FormBuilder, private router: Router) {
    this.loginForm =this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]]
    });
   }

  errorText?: String ;
  alert?: boolean ;
  loading?: boolean;
  loginForm?: FormGroup;

  ngOnInit(): void {
    this.errorText = "";
    this.alert = false;
    this.loading = false;

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  login(){
    this.alert = !this.alert;
    this.errorText = "login";
    console.log(this.loginForm);
  }

}
