import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ApiServiceService } from './services/api-service.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frag-wahl';

  sideBarOpen = true;
  private apiService: ApiServiceService

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private activatedRoute: ActivatedRoute) {
    this.login();
    // Get uri params
    // Handle candidate which wants to respond
    this.activatedRoute.queryParams.subscribe(params => {
      let questionID = params['questionID'];
      let candidateId = params['candidateID'];
      let secret = params['secret'];
      let candidateSecret = params['candidateSecret'];
      if (questionID && candidateId && secret) {
        console.log('KANDIDAT!');
      }
    });
  }
  login() {
    this.afAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log('EINGELOGGT');

        if (!localStorage.getItem('loaded2')) {
          localStorage.setItem('loaded2', 'loaded2');
          window.location.reload();
        }

        this.apiService = new ApiServiceService(this.afAuth, this.afs)
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
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  toggleMenu() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
