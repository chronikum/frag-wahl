import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../ask-question-dialog/ask-question-dialog.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';

interface QuestionMetadata {
  questionID: string,
  candidateID: string,
  secret: string,
  candidateSecret: string,
}
@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.scss']
})
export class AnswerDialogComponent implements OnInit {


  antwortForm: FormGroup;

  questionTitle: string;
  questionContent: string;

  answerText: string;

  constructor(
    public dialogRef: MatDialogRef<AnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiServiceService, fb: FormBuilder) {
    this.antwortForm = fb.group({
      answerContent: ['', [Validators.required]],
    });
    console.log('DATA' + data);
    // this.getQuestionContent()
  }

  ngOnInit() {
  }

  async getQuestionContent() {
    var questionText = await this.apiService.getQuestionForID(this.data.questionData.questionID);
    console.log('SCHAU HIER!')
    console.log(questionText);
  }

  antworten() {
    this.collectValues()
  }

  collectValues() {
    this.answerText = this.antwortForm.value.answerContent;
    console.log(this.answerText);
    this.apiService.answerQuestion(this.data.questionData, this.answerText);
  }

  close(): void {
    this.dialogRef.close();
  }
}
