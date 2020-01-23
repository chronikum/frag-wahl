import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ApiServiceService } from './services/api-service.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AnswerDialogComponent } from './dialogs/answer-dialog/answer-dialog.component';

interface QuestionMetadata {
  questionID: string,
  candidateID: string,
  secret: string,
  candidateSecret: string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frag-wahl';

  sideBarOpen = true;
  public apiService: ApiServiceService

  // tslint:disable-next-line: max-line-length
  constructor(public dialog: MatDialog, public afAuth: AngularFireAuth, private afs: AngularFirestore, private activatedRoute: ActivatedRoute) {
    this.checkLoggedIn()
  }
  checkLoggedIn = async () => {
    this.login();
    var checker = setInterval(() => {
      if (this.checkAuth()) {
        clearInterval(checker)
        setTimeout(() => {
          console.log('LOS!')
          this.checkIfCandidate()
        }, 200)
      }
    }, 20);
  }

  // Ist es ein Kandidierender?
  checkIfCandidate(): void {
    // Get uri params
    // Handle candidate which wants to respond
    this.activatedRoute.queryParams.subscribe(params => {
      let questionID = params['questionID'];
      let candidateID = params['candidateID'];
      let secret = params['secret'];
      let candidateSecret = params['candidateSecret'];
      // Ist jeder Schlüssel vorhanden?
      if (questionID && candidateID && secret) {
        var meta: QuestionMetadata = {
          secret, candidateID, questionID, candidateSecret
        }
        this.openDialog(meta)
      }
    });
  }

  checkAuth() {
    if (this.afAuth.auth && this.afAuth.auth.currentUser) {
      return true;
    }
  }


  // Öffnet Antwort Dialog mit Metadata der Question
  openDialog(questionData: QuestionMetadata): void {
    var questionText = 'asdff'
    const dialogRef = this.dialog.open(AnswerDialogComponent, {
      width: '95%',
      data: {
        questionData, questionText
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  okLoggedIn() {
    console.log('YAY')
  }

  async login() {
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
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  toggleMenu() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
