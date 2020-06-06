import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { UserDetails, FeedBack }  from './dataStructure';

@Injectable()
export class DataService {

    private userDetailsCollection: AngularFirestoreCollection<UserDetails>; 
    private feedbackCollection: AngularFirestoreCollection<FeedBack>;
    
    constructor(private afs: AngularFirestore) { 

        this.userDetailsCollection = afs.collection<UserDetails>('userDetails');
        this.feedbackCollection = afs.collection<FeedBack>('feedback');
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

    getAllNotesOfCurrentUser(){
        return new Promise((resolve,reject)=>{

            
        });
    }

}