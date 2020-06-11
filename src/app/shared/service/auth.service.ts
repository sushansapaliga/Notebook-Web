import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { DataService } from './data.service';
import { UserDetails } from './dataStructure';


@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private dataService: DataService) {
   }

  private userDetailOfSignUp: UserDetails;

  private getUserDisplayError(errorMessage: string){
    return errorMessage;
  }

  logIn(email: string, password: string){
    return new Promise((resolve, reject)=>{
        this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result)=>{
            resolve();
        })
        .catch((error)=>{
            reject(this.getUserDisplayError(error.message));
        });
    });
      
  }

  signUp(email: string, password: string, firstName: string, lastName: string){

      return new Promise((resolve, reject)=>{

          this.afAuth.createUserWithEmailAndPassword(email, password)
          .then((result)=>{

              result.user.updateProfile({
                  displayName: firstName
              })
              .then((result)=>{

                  this.afAuth.signOut()
                  .then((result)=>{

                      this.afAuth.signInWithEmailAndPassword(email, password)
                      .then((result)=>{

                        const userUID = result.user.uid;

                        this.userDetailOfSignUp ={
                          firstName: firstName,
                          lastName: lastName,
                          userID: userUID
                        };

                        this.dataService.addUserDetails(this.userDetailOfSignUp)
                        .then((result)=>{

                          this.dataService.addNewNote(userUID).then((result)=>{
                            
                            resolve();
                          })
                          .catch((error)=>{

                            reject(this.getUserDisplayError(error));
                          });

                        })
                        .catch((error)=>{

                          reject(this.getUserDisplayError(error));
                        });
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
          })
          .catch((error)=>{

            reject(this.getUserDisplayError(error.message));
        });
      });
  }

  changePassword(){
    
  }

  logOut(){
    return this.afAuth.signOut();
  }
}