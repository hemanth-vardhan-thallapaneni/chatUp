import { Injectable } from '@angular/core';
import { switchMap, first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {User} from './user.model';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$: Observable<any>;
  isLoggedIn = new BehaviorSubject(false);

  constructor(
     private afAuth: AngularFireAuth,
     private afs: AngularFirestore,
    private router: Router,
  ) { 

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user:any) => {
          // Logged in
        if (user) {
          this.isLoggedIn.next(true)
          return this.afs.doc<User>(`users/${user['uid']}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user:any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL
    } 
     if(data.uid){
      this.isLoggedIn.next(true)
      this.router.navigate(['/home'])
     }
    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.signOut();
    this.isLoggedIn.next(false)
    this.router.navigate(['/']);
  }
  getUser() {
    return firebase.auth().currentUser?.uid;
  }
  }


