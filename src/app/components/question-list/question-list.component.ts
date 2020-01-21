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

  faThumbsUp = faThumbsUp;


  constructor() { }

  ngOnInit() {
  }

  getQuestions() {

  }

  getItems() {
    if (this.mode === 'popular') {
      this.items = this.items.sort((a, b) => b.likes - a.likes);
    }
    if (this.mode === 'new') {
      this.items = this.items.sort((a, b) => b.created - a.created);
    }
    return this.items;
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

}
