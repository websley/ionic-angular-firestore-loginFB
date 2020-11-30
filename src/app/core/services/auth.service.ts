import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthProvider, User, AuthOptions } from './auth.types';
import  auth  from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.default.User>;

  constructor(private afAuth: AngularFireAuth) { 
    this.authState$ = this.afAuth.authState;
  }

  get isAuthenticated(){
    return this.authState$.pipe(map(user => user !== null ));
  }

  authenticate({ isSignIn, provider, user }: AuthOptions){
    //let operation: Promise<auth.auth.UserCredential>;
    let operation: Promise<firebase.default.auth.UserCredential>;
    console.log()
    console.log('provider', provider);
    console.log('user', user);
    if(provider !== AuthProvider.Email){
      operation = this.signInWithPopup(provider);
    }else{
      operation = isSignIn ? this.SignInEmail(user) : this.SignUpEmail(user)
    }

    return operation
  }

  logout(){
    return this.afAuth.signOut();
  }

  private SignInEmail({ email, password }: User){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  private SignUpEmail({ email, password, name }: User){
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials => 
          credentials.user.updateProfile({displayName: name, photoURL: null})
          .then(() => credentials)
          );
  }

  private signInWithPopup(provider: AuthProvider){
    let signProvider = null;

    
    switch(provider){
      case AuthProvider.Facebook:
        signProvider = new firebase.default.auth.FacebookAuthProvider();
        break;
    }

    return this.afAuth.signInWithPopup(signProvider);
  }

}
