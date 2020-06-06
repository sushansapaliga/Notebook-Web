import { Component, OnInit, NgZone } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public fb:FormBuilder, private router: Router, private ngZone: NgZone, public afAuth: AngularFireAuth) { 
    this.changePasswordForm =this.fb.group({
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      confirmPassword:['',Validators.required]
    },{
      validators:this.checkIfMatchingPasswords("password","confirmPassword")
    });
  }


  changePasswordForm: FormGroup;
  userEmail: string;
  userName: string;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  changeBtnText: string;

  ngOnInit(): void {

    this.isSuccess = false;
    this.isError = false;
    this.errorMessage = null;

    this.changeBtnText = 'Change Password';

    this.afAuth.onAuthStateChanged(user=>{

      if(user ){

        this.userEmail = user.email;
        this.userName = user.displayName;
      }else{

        this.ngZone.run(() => this.router.navigate(['/login']));
      }
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

 changePasswordSubmit(){

  if(this.isLoading){
    return ;
  }

  this.isLoading = true;
  this.changeBtnText = 'Changing Password...';
  this.isSuccess = false;
  this.isError = false;

  const newPassword = this.changePasswordForm.value.password;

  this.afAuth.authState.subscribe((user)=>{
    user.updatePassword(newPassword)
    .then((result)=>{
      
      this.isSuccess = true;
    })
    .catch((error)=>{

      this.errorMessage = error.message;
      this.isError = true;
    })
    .finally(()=>{

      this.isLoading = false;
      this.changeBtnText = 'Change Password';
      this.changePasswordForm.reset();
    });
  })

 }

 goBack(){
  this.ngZone.run(() => this.router.navigate(['/more']));
 }

}
