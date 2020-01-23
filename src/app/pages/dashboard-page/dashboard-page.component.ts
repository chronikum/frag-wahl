import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
export interface Question {
  title: string;
  content: string;
  candidates: string[];
  created?: number;
  id: string;
  fromUser?: string,
  likes?: number;
}
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit {
  questions = [];
  questionsNew: Question[] = [];
  faThumbsUp = faThumbsUp;
  apiService: ApiServiceService;
  selectedTab = 0;

  // Modes
  popular = "popular";
  new = "new";

  answers = []

  constructor(public api: ApiServiceService) {
    this.apiService = api;
    this.apiService.items.subscribe(check => {
      console.log(JSON.stringify(check));
      if (!JSON.stringify(check).includes('>') && !JSON.stringify(check).includes('<')) {
        this.questions = check.sort((a, b) => b.likes - a.likes);
      }
      for (var qIndex in this.questions) {
        var question = this.questions[qIndex];
        this.apiService.setupQuestionListener(question.id);
        
      }
    });
  }

  ngOnInit() {
  }



}
