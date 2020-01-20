import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  questions = []
  constructor(public apiService: ApiServiceService) {
    this.apiService.items.subscribe(check => {
      console.log(JSON.stringify(check))
      if (!JSON.stringify(check).includes('>') && !JSON.stringify(check).includes('<')) {
        this.questions = check;
      }
    })
  }

  ngOnInit() {
  }

  getQuestions() {

  }

}
