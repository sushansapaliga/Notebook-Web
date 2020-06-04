import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public fb:FormBuilder, private router: Router) { 
    this.feedbackForm = this.fb.group({
      email:['',[Validators.email]],
      name:['',[Validators.maxLength(50)]],
      subject:['',[Validators.required,Validators.maxLength(70)]],
      body:['',[Validators.required,Validators.maxLength(this.maxFeedbackWords)]]
    });
  }

  feedbackForm?: FormGroup;
  maxFeedbackWords?: number = 600;

  ngOnInit(): void {
    this.maxFeedbackWords = 600;

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  feedbackSubmit(){
    console.log('hello');
  }

}
