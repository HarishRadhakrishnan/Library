import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = new BehaviorSubject<object>(JSON.parse(localStorage.getItem('login')) 
  || {loggedIn: false, isAdmin: false, user: 'Unauthorized'});
  
  isLoggedIn = this.isUserLoggedIn.asObservable();
  // get isLoggedIn(): Observable<object> {
  //   return this.isUserLoggedIn.asObservable();
  // }
  constructor( private afAuth: AngularFireAuth) { }

  getLoggedInUser(){
    return this.afAuth.authState;
  }

  loginWithGoogle(username: any, password: any){
    // if(username === 'admin@gmail.com' && password === 'admin123'){
    //   return this.afAuth.auth.signInWithEmailAndPassword(username, password);
    // }
    return this.afAuth.auth.signInWithEmailAndPassword(username, password);
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider);
  }

  logoutWithGoogle(){
    return this.afAuth.auth.signOut();
  }

}
