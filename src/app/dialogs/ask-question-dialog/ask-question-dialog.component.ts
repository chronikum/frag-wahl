import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService, Question } from 'src/app/services/api-service.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

export interface DialogData {
  title: string;
  content: string;
  candidates: [string];
}

@Component({
  selector: 'app-ask-question-dialog',
  templateUrl: './ask-question-dialog.component.html',
  styleUrls: ['./ask-question-dialog.component.scss']
})
export class AskQuestionDialogComponent implements OnInit {

  questionForm: FormGroup;

  questionTitle: string;
  questionContent: string;
  candidates: string[];
  constructor(
    public dialogRef: MatDialogRef<AskQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiServiceService, fb: FormBuilder) {
    this.questionForm = fb.group({
      title: [''],
      content: [''],
      candidates: [[]],
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.onNoClick()
  }

  ngOnInit() {
  }

  submitQuestion() {
    this.collectValues();
  }

  collectValues() {
    this.questionTitle = this.questionForm.value.title;
    this.questionContent = this.questionForm.value.content;
    this.candidates = this.questionForm.value.candidates;
    console.log(this.questionTitle);
    console.log(this.questionContent);
    console.log(this.candidates);

    var question: Question = {
      title: this.questionTitle,
      content: this.questionContent,
      candidates: this.candidates,
    };

    this.apiService.addQuestion(question);
  }

  getCandidates() {
    console.log(this.apiService.candidates);
    return this.apiService.candidates;
  }

}
