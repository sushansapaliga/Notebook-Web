import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public fb:FormBuilder, private router: Router) { 
    this.signUpForm =this.fb.group({
      firstName:['',[Validators.required,Validators.maxLength(25)]],
      lastName:['',[Validators.required,Validators.maxLength(40)]],
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      confirmPassword:['',Validators.required],
      termsAndCondition:['', Validators.required]
    },{
      validators:this.checkIfMatchingPasswords("password","confirmPassword")
    });
  }

  errorText?: String ;
  alert?: boolean ;
  loading?: boolean;
  signUpForm: FormGroup;

  ngOnInit(): void {
    this.errorText = 'hello';
    this.alert = false;

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  checkIfMatchingPasswords(passwordKey:string, confirmPasswordKey:string){
    return (group:FormGroup)=>{
     let password=group.controls[passwordKey];
     let confirmPassword= group.controls[confirmPasswordKey];
     if(password.value==confirmPassword.value){
       return;
     }else{
       confirmPassword.setErrors({
         notEqualToPassword:true
       });
     }
    }
 }

  signup(){
    this.alert = !this.alert;
    this.errorText = "Sign in"
  }

}
