import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public fb:FormBuilder, private router: Router) { 
    this.changePasswordForm =this.fb.group({
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      confirmPassword:['',Validators.required]
    },{
      validators:this.checkIfMatchingPasswords("password","confirmPassword")
    });
  }


  changePasswordForm: FormGroup;


  ngOnInit(): void {
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
   this.changePasswordForm.reset();
   console.log('hello');
 }

}
