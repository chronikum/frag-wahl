import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
export interface Kandidat {
  name: string;
  id: number;
}

interface QuestionMetadata {
  questionID: string;
  candidateID: string;
  secret: string;
  candidateSecret: string;
}

interface AnswerMeta {
  questionMeta: QuestionMetadata;
  answerText: string;
  created: number;
}

export interface Question {
  title: string;
  content: string;
  candidates: string[];
  created?: number;
  id: string;
  fromUser?: string;
  likes?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private firestore: AngularFirestore;
  items: Observable<any[]>;
  candidates: Observable<any[]>;
  candidatesQuery: Observable<any[]>;
  questions: Question[];

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth = auth;
    this.firestore = afs;
    this.startListener();
  }

  /**
   * Starts listener - should be called after login
   */
  startListener() {
    this.listenToQuestions();
    this.listenCandidates();
  }

  /**
   * Looks for new questions
   */
  listenToQuestions() {
    this.items = this.firestore.collection('items').valueChanges();
    this.items.subscribe(questions => {
      // tslint:disable-next-line: prefer-const
      var questionArray: Question[] = questions;
      this.questions = questionArray;
    })
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
    this.uploadQuestion(question);
  }

  // XSS Prevention
  uploadQuestion(question: Question) {
    const questionId = this.uuidv4();
    const questionBackend: Question = {
      title: question.title,
      content: question.content,
      candidates: question.candidates,
      created: Date.now(),
      id: questionId,
      fromUser: this.auth.auth.currentUser.uid,
      likes: 0,
    };

    this.firestore.collection('items').doc(questionId).set(questionBackend).then(response => {
      console.log(response);
    });

    this.firestore.collection('waiting').add(questionBackend);

  }



  likeQuestion(id: string) {
    if (!localStorage.getItem(id + 'like')) {
      localStorage.setItem(id + 'like', 'true');

      const likeIncrement = this.firestore.collection('items').doc(id).update({
        likes: firebase.firestore.FieldValue.increment(1)
      });

    }

  }


  // Answer to a question
  answerQuestion(questionMeta: QuestionMetadata, answerText: string) {


    const answer: AnswerMeta = {
      questionMeta, answerText, created: Date.now()
    };
    // tslint:disable-next-line: max-line-length
    this.firestore.collection('items').doc(questionMeta.questionID).collection('answers').doc(questionMeta.secret).collection('responses').add(
      answer
    ).then(response => {
      console.log(response);
    });
  }

  // Generate id
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getAnswerForQuestion(questionID) {
    let questions = this.firestore.collection('items').doc(questionID).collection('answers').get().subscribe(x => {
      console.log(x);
    })
  }

  async getQuestionForID(questionID: string) {

    return this.questions.forEach(q => {
      console.log('ASDAS');
      console.log(q)
      if (q.id === questionID) {
        console.log(q.content)
        return q.content;
      }
    })
  }
}
