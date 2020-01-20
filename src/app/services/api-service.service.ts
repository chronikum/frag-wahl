import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private firestore: AngularFirestore
  items: Observable<any[]>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.firestore = afs;
    this.listenToQuestions()
  }
  listenToQuestions() {
    this.items = this.firestore.collection('items').valueChanges();
  }


}
