import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { timingSafeEqual } from 'crypto';
export interface Kandidat {
  name: string;
  id: number;
}
export interface Question {
  title: string;
  content: string;
  candidates: string[];
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private firestore: AngularFirestore
  items: Observable<any[]>;
  candidates: Observable<any[]>;
  candidatesQuery: Observable<any[]>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth = auth;
    this.firestore = afs
    this.startListener()
  }

  /**
   * Starts listener - should be called after login
   */
  startListener() {
    this.listenToQuestions()
    this.listenCandidates()
  }

  /**
   * Looks for new questions
   */
  listenToQuestions() {
    this.items = this.firestore.collection('items').valueChanges();
  }

  /**
   * Listen to the candidate names
   */
  listenCandidates() {
    this.candidates = this.firestore.collection('kandidaten').doc('lorch').collection('kandidatenNamen').valueChanges();
  }

  /**
   * Adds Question
   */
  addQuestion(question: Question) {
    console.log('Frage erhalten: ' + question);
  }

  // XSS Prevention
  uploadQuestion(question: Question) {

  }
}
