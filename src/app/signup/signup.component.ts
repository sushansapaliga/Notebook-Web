import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public fb:FormBuilder, private router: Router, public authService: AuthService) { 
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

  errorText: String ;
  isError: boolean ;
  loading: boolean;
  signUpForm: FormGroup;
  signUpBtnText: string;

  ngOnInit(): void {
    this.errorText = null;
    this.isError = false;
    this.loading = false;
    this.signUpBtnText = 'Sign Up';

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });

    /* logout if incase the user is logged-in */
    this.authService.logOut();
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

    if(this.loading){
      return;
    }

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const firstName = this.signUpForm.value.firstName;
    const lastName = this.signUpForm.value.lastName;

    this.loading = true;
    this.signUpBtnText = 'Signing Up...';

    this.authService.signUp(email, password, firstName, lastName)
    .then((result)=>{
      this.router.navigate(['/home']);
      this.loading = false;
      this.signUpBtnText = 'Sign Up';
    })
    .catch((errorText)=>{
      this.errorText = errorText;
      this.loading = false;
      this.signUpBtnText = 'Sign Up';
      this.isError = true;
    });

  }

}
