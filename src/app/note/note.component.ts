import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  noteContent: String;

  constructor(private router: Router) {
    this.noteContent = 'hello \nhello \nhello \nhello \nhello \n';
   }

  ngOnInit(): void {
    console.log(this.router.url);
  }

}
