import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input() items = [];
  @Input() answers = [];
  @Input() apiService: ApiServiceService;
  @Input() mode: string;

  questions = [];

  responses: {};

  faThumbsUp = faThumbsUp;

  candidates = {};

  randomized: boolean;


  constructor(private activatedRoute: ActivatedRoute) {
    this.responses = {};
    this.activatedRoute.queryParams.subscribe(params => {
      let questionRef = params['questionRef'];
      console.log(questionRef);
    });
  }

  getTime(number: number) {
    return new Date(number).toLocaleString();
  }
  ngOnInit() {
    this.getCandidates();
  }

  getQuestions() {
    return this.questions;
  }

  getItems() {
    this.questions = this.items;
    if (this.items) {
      if (this.mode === 'popular') {
        this.items = this.items.sort((a, b) => b.likes - a.likes);
      }
      if (this.mode === 'new') {
        this.items = this.items.sort((a, b) => b.created - a.created);
      }
      return this.items;
    }
  }

  shuffle(array) {
    // tslint:disable-next-line: one-variable-per-declaration
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  dataLoaded() {
    if (this.items.length !== 0) {
      return true;
    }
    return false;
  }

  /**
   * Likes Question with ID
   * @param id Question Id
   */
  likeQuestion(id: string) {
    this.apiService.likeQuestion(id);
  }

  // Amount of likes for a certain question
  getLikesForQuestion(id: string) {
    if (!id) { return 0; }
    return id;
  }

  // Amount of likes for a certain question
  lookUpResponse(id: string) {
    if (!id) { return 0; }
    return id;
  }

  // Calculate date and time
  getTimeforQuestion(timestamp: number) {

    return new Date(timestamp).toLocaleString();
  }

  getCandidates() {
    this.apiService.candidates.subscribe(candArray => {
      let arrayCandidates: any[] = [];
      for (let candIndex in candArray) {
        let candidate = candArray[candIndex];
        console.log('HALLO WELT');
        console.log(candidate);
        this.candidates['' + candidate.id] = candidate;
      }
    });
  }

  loadAnswers(questionID: string) {
    return this.apiService.responses[questionID];
  }

  hasAnswers(questionID: string) {
    return this.apiService.responses[questionID];
  }

  async getAnswers(questionID: string) {
    return;
  }

  // Is this the most popular question?
  isMostPopular(questionID: string) {
    let questionsOrder = this.items.sort((a, b) => b.likes - a.likes);
    return (questionID === questionsOrder[0].id);
  }



}
