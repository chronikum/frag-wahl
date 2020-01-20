import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ApiServiceService } from './services/api-service.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frag-wahl';

  sideBarOpen = true;
  private apiService: ApiServiceService

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.login();
  }
  login() {
    this.afAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log('EINGELOGGT');
      }
    });
    this.afAuth.auth.signInAnonymously().catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
    });
    this.apiService = new ApiServiceService(this.afAuth, this.afs)
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  toggleMenu() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
