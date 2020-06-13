import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notes, NotesContainer, AddNotes, AddNotesContainer } from '../shared/service/dataStructure';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from '../shared/service/data.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {
  
  private notesCollection: AngularFirestoreCollection<AddNotes>;
  private notesContainerCollection: AngularFirestoreCollection<AddNotesContainer>;

  noteBodyForCompare: string;
  noteID: string;
  noteContainerID: string;
  routeLinkMantainer: any;
  isLoading: boolean;
  isBodyLoaded: boolean;
  note: Observable<unknown>;
  noteContainer: Observable<NotesContainer[]>;
  NoteForm: FormGroup;
  isSuccess: boolean;
  isError: boolean;
  errorText: string;
  isSaving: boolean;
  saveBtnText: string;

  userID: any;
  authManager: any;

  constructor(
    public fb:FormBuilder, 
    private router: Router, 
    private ngZone: NgZone, 
    private route: ActivatedRoute, 
    private afs: AngularFirestore, 
    private dataService: DataService, 
    private afAuth: AngularFireAuth
    ) {

    this.isLoading = true;
    this.isBodyLoaded = false;
    this.isSuccess = false;
    this.isError = false;
    this.errorText = null;
    this.isSaving = false;
    this.saveBtnText = 'Save';

    this.NoteForm = this.fb.group({
      title: ['',[Validators.required,Validators.maxLength(25)]],
      description: ['',[Validators.required,Validators.maxLength(200)]],
      body: ['', [Validators.required, Validators.maxLength(100000)]],
      visibility: ['',[Validators.required]]
    });
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

    this.authManager = this.afAuth.authState.subscribe((user)=>{

      this.userID = user.uid;
      this.notesCollection = this.afs.collection<AddNotes>('notes', ref => ref.where('userID','==', this.userID).where('linkToContent','==',this.noteContainerID).limit(1));
      this.notesContainerCollection = this.afs.collection<AddNotesContainer>('notesContainer', ref => ref.where('userID','==', this.userID).where('linkToContent','==',this.noteContainerID).limit(1));
      this.getNotes();
    });

    
  }

  ngOnDestroy(): void{
  
    this.routeLinkMantainer.unsubscribe();
    this.authManager.unsubscribe();
  }

  goBackToHome(){
    this.ngZone.run(() => this.router.navigate(['/home']));
  }

  getNotes(){
    try {
      this.note = this.notesCollection.snapshotChanges().pipe(
        map(actions => actions.map(a=>{
          const data = a.payload.doc.data() as Notes;
          data.id = a.payload.doc.id;
          this.noteID = data.id;
          this.NoteForm.controls['title'].setValue(data.heading);
          this.NoteForm.controls['description'].setValue(data.description);
          this.NoteForm.controls['visibility'].setValue(data.visibility);
          this.getNoteBody();
          this.isLoading = false;
          return data;
        }))
      );
      
    } catch (error) {
      console.log('No network');
    }
    
  }

  getNoteBody(){

    this.noteContainer = this.notesContainerCollection.valueChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a as NotesContainer;
        this.NoteForm.controls['body'].setValue(data.body);
        this.noteBodyForCompare = data.body;
        this.isBodyLoaded = true;
        return data;
      }))
    );
  }

  saveTheNote(){
    if(!this.isBodyLoaded || this.NoteForm.invalid || this.isSaving){
      return ;
    }

    this.isSuccess = false;
    this.isError = false;
    this.isSaving = true;
    this.saveBtnText = 'Saving...';

    const title = this.NoteForm.value.title;
    const description = this.NoteForm.value.description;
    const body = this.NoteForm.value.body;
    const visibility = this.NoteForm.value.visibility;

    if(this.noteBodyForCompare == body){
      
      this.dataService.updateNoteWithoutBody(this.noteID, this.noteContainerID, title, description, visibility)
      .then((result)=>{

        this.isSuccess = true;
      })
      .catch((error)=>{

        this.errorText = error;
        this.isError = true;
      })
      .finally(()=>{

        this.isSaving = false;
        this.saveBtnText = 'Save';
      });
    }else{
      
      this.dataService.updateNoteWithBody(this.noteID, this.noteContainerID, title, description, visibility, body)
      .then((result)=>{

        this.isSuccess = true;
      })
      .catch((error)=>{

        this.errorText = error;
        this.isError = true;
      })
      .finally(()=>{

        this.isSaving = false;
        this.saveBtnText = 'Save';
      });
    }

  }

  getLink(){
    return 'https://notebook-d0ff5.firebaseapp.com/view/'+ this.noteContainerID;
  }

}
