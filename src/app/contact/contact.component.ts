import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../shared/service/data.service';
import { FeedBack } from '../shared/service/dataStructure'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public fb:FormBuilder, private router: Router, private dataService: DataService) { 
    this.feedbackForm = this.fb.group({
      email:['',[Validators.email]],
      name:['',[Validators.maxLength(50)]],
      subject:['',[Validators.required,Validators.maxLength(70)]],
      body:['',[Validators.required,Validators.maxLength(this.maxFeedbackWords)]]
    });
  }

  feedbackForm?: FormGroup;
  maxFeedbackWords?: number = 600;
  feedbackSubmitDetails: FeedBack;
  isError: boolean;
  errorText: string;
  isSuccessful: boolean;
  isLoading: boolean;
  submitBtnText: string;

  ngOnInit(): void {
    this.maxFeedbackWords = 600;
    this.isError = false;
    this.isSuccessful = false;
    this.isError = null;
    this.submitBtnText = 'Submit';


    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  feedbackSubmit(){

    if(this.isLoading){
      return;
    }

    this.isLoading = true;
    this.isError = false;
    this.isSuccessful = false;
    this.submitBtnText = 'Submitting...';

    let email = '';
    let name = '';

    if(this.feedbackForm.value.email == ''){
      email = 'anonymous';
    }else{
      email = this.feedbackForm.value.email ;
    }

    if(this.feedbackForm.value.name == ''){
      name = 'anonymous';
    }else{
      name = this.feedbackForm.value.name ;
    }

    this.feedbackSubmitDetails={
      email: email,
      name: name,
      subject: this.feedbackForm.value.subject,
      content: this.feedbackForm.value.body
    }

    this.dataService.addFeedback(this.feedbackSubmitDetails).then((result)=>{

      this.isSuccessful = true;
      this.submitBtnText = 'Sumbit';
      this.isLoading = false;
      this.feedbackForm.reset();
    })
    .catch((error)=>{

      this.isError = true;
      this.errorText = error;
      this.isLoading = false;
      this.submitBtnText = 'Sumbit';
    });
  }

}
