import { Component, OnInit, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input() items = [];
  @Input() apiService: ApiServiceService;
  @Input() mode: string;

  questions = [];

  faThumbsUp = faThumbsUp;


  constructor() { }

  ngOnInit() {
  }

  getQuestions() {
    return this.questions
  }

  getItems() {
    this.questions = this.items;
    if (this.items) {
      console.log(this.items)
      if (this.mode === 'popular') {
        this.items = this.items.sort((a, b) => b.likes - a.likes);
      }
      if (this.mode === 'new') {
        this.items = this.items.sort((a, b) => b.created - a.created);
      }
      return this.items;
    }
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

  loadAnswers(questionID: string) {
    return this.apiService.getAnswerForQuestion(questionID);
  }

}
