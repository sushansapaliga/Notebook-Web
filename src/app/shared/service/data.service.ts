import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import  * as firebase from 'firebase';
import 'firebase/firestore' ;
import { UserDetails, FeedBack, AddNotes, AddNotesContainer }  from './dataStructure';

@Injectable()
export class DataService {

    private userDetailsCollection: AngularFirestoreCollection<UserDetails>; 
    private feedbackCollection: AngularFirestoreCollection<FeedBack>;
    private notesCollection: AngularFirestoreCollection<AddNotes>;
    private notesContainerCollection: AngularFirestoreCollection<AddNotesContainer>;

    private newNotes: AddNotes;
    private newNotesContainer: AddNotesContainer;

    
    constructor(private afs: AngularFirestore) { 

        this.userDetailsCollection = afs.collection<UserDetails>('userDetails');
        this.feedbackCollection = afs.collection<FeedBack>('feedback');
        this.notesCollection = afs.collection<AddNotes>('notes');
        this.notesContainerCollection = afs.collection<AddNotesContainer>('notesContainer');
    }

    private getUserDisplayError(errorMessage: string): string{
        return errorMessage;
    }

    addUserDetails(userDetailsOfSignUp: UserDetails){

        return new Promise((resolve,reject)=>{
            this.userDetailsCollection.add(userDetailsOfSignUp).then((result)=>{
                resolve();
            })
            .catch((error)=>{
                reject(this.getUserDisplayError(error.message));
            });
        });
    }

    addFeedback(feedbackSubmit: FeedBack){
        return new Promise((resolve,reject)=>{

            this.feedbackCollection.add(feedbackSubmit)
            .then((result)=>{
                resolve();
            })
            .catch((error)=>{
                reject(this.getUserDisplayError(error.message));
            });
        });
    }

    addNewNote(userID: string){
        this.newNotesContainer = {
            body: '#sample body',
            linkToContent: '1234',
            userID: userID,
            visibility: 'private'
        }

        return new Promise((resolve,reject)=>{
            this.notesContainerCollection.add(this.newNotesContainer)
            .then((result)=>{

                const docID = result.id;

                this.newNotes = {
                    description: '#click me',
                    heading: 'New Note',
                    linkToContent: docID,
                    updateTime: firebase.firestore.FieldValue.serverTimestamp(),
                    userID: userID,
                    visibility: 'private'
                }

                this.notesCollection.add(this.newNotes)
                .then((result)=>{

                    this.notesContainerCollection.doc(docID).update({linkToContent: docID})
                    .then((result)=>{

                        resolve();
                    })
                    .catch((error)=>{

                        reject(this.getUserDisplayError(error.message));
                    });
                })
                .catch((error)=>{

                    reject(this.getUserDisplayError(error.message));
                });
            })
            .catch((error)=>{

                reject(this.getUserDisplayError(error.message));
            });
        });
    }

    updateNoteWithoutBody(noteID: string, noteContainerID: string, title: string, description: string, visibility: string ){
    
        return new Promise((resolve, reject)=>{

            this.notesContainerCollection.doc(noteContainerID).update({visibility: visibility})
            .then((result)=>{

                this.notesCollection.doc(noteID).update({
                    description: description,
                    heading: title,
                    visibility: visibility,
                    updateTime: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((result)=>{

                    resolve();
                })
                .catch((error)=>{

                    reject(this.getUserDisplayError(error.message));
                })
            })
            .catch((error)=>{

                reject(this.getUserDisplayError(error.message));
            });
        });
    }

    updateNoteWithBody(noteID: string, noteContainerID: string, title: string, description: string, visibility: string, body: string ){
    
        return new Promise((resolve, reject)=>{

            this.notesContainerCollection.doc(noteContainerID).update({
                visibility: visibility,
                body: body
            })
            .then((result)=>{

                this.notesCollection.doc(noteID).update({
                    description: description,
                    heading: title,
                    visibility: visibility,
                    updateTime: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((result)=>{

                    resolve();
                })
                .catch((error)=>{

                    reject(this.getUserDisplayError(error.message));
                })
            })
            .catch((error)=>{

                reject(this.getUserDisplayError(error.message));
            });
        });
    }

}