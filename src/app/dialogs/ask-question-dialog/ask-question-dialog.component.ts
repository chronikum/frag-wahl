import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api-service.service';
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

  constructor(
    public dialogRef: MatDialogRef<AskQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiServiceService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.onNoClick()
  }

  ngOnInit() {
  }

  submitQuestion() {

  }

  getCandidates() {
    console.log(this.apiService.candidates);
    return this.apiService.candidates;
  }

}
