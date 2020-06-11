import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { AddNotes, AddNotesContainer } from '../shared/service/dataStructure';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit,OnDestroy {

  private notesCollection: AngularFirestoreCollection<AddNotes>;
  private notesContainerCollection: AngularFirestoreCollection<AddNotesContainer>;

  noteHeading: String;
  noteDescription: String;
  noteContent:String;
  noteContentSplit: String[];

  routeLinkMantainer: any;
  noteContainerID: string;

  note: Observable<AddNotes[]>;
  noteContainer: Observable<AddNotesContainer[]>;

  constructor( private router: Router, private route: ActivatedRoute, private afs: AngularFirestore) {

    
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.routeLinkMantainer = this.route.params.subscribe(params=>{
      this.noteContainerID = params['id'];
    });

    this.notesCollection = this.afs.collection<AddNotes>('notes', ref => 
                                                                  ref.where('linkToContent','==',this.noteContainerID)
                                                                  .where('visibility','==','public')
                                                                  .limit(1));
    
    
    this.notesContainerCollection = this.afs.collection<AddNotesContainer>('notesContainer', ref => 
                                                                                            ref.where('linkToContent','==',this.noteContainerID)
                                                                                            .where('visibility','==','public')
                                                                                            .limit(1));

    this.getNotes();
  }

  ngOnDestroy(): void {
    
    this.routeLinkMantainer.unsubscribe();
  }

  getNotes() {
    
    this.note = this.notesCollection.valueChanges().pipe(
      map(actions=>actions.map(a=>{
        const data = a as AddNotes;
        this.getNoteBody();
        return data;
      }))
    );
  }

  getNoteBody(){

    this.noteContainer = this.notesContainerCollection.valueChanges().pipe(
      map(actions=>actions.map(a=>{
        const data = a as AddNotesContainer;
        return data;
      }))
    )
  }
  
}
