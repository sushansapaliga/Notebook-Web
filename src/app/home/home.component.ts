import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Notes } from '../shared/service/dataStructure';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../shared/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  notes: Observable<Notes[]>;
  isLoading: boolean;
  notesCollection: AngularFirestoreCollection<Notes>;
  userID: any;

  authManager: any;


  constructor(private router: Router, private ngZone: NgZone, private afs: AngularFirestore, private afAuth: AngularFireAuth, private dataService: DataService) {

    this.isLoading = false;    

    this.getAllNotesOfCurrentUser();

   }

  ngOnInit(): void { 
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  }

  ngOnDestroy(){
    this.authManager.unsubscribe();
  }

  getAllNotesOfCurrentUser(){

    try{
      this.authManager = this.afAuth.authState.subscribe((user)=>{
        this.userID = user.uid;

        this.notesCollection = this.afs.collection<Notes>('notes', ref => ref.where('userID','==', this.userID).orderBy('updateTime','desc'));
        this.notes = this.notesCollection.snapshotChanges().pipe(
          map(actions => actions.map(a=>{
            const data = a.payload.doc.data() as Notes;
            data.id = a.payload.doc.id;
            return data;
          }))
        );
      });
    }catch{
      this.ngZone.run(() => this.router.navigate(['/login']));
    }

  }

  goToMorePage(){
    this.ngZone.run(() => this.router.navigate(['/more']));
  }

  getToNote(docID){
    this.ngZone.run(() => this.router.navigate(['/note/'+ docID]));
  }

  logdetails(){

    if(this.isLoading){
      return;
    }

    this.isLoading = true;

    this.dataService.addNewNote(this.userID).then((result)=>{
      this.isLoading = false;
      this.getAllNotesOfCurrentUser();
    });
  }

}
