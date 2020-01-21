import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../ask-question-dialog/ask-question-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-disclaimer-dialog',
  templateUrl: './disclaimer-dialog.component.html',
  styleUrls: ['./disclaimer-dialog.component.scss']
})
export class DisclaimerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DisclaimerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.onNoClick()
  }

  ngOnInit() {
  }
}


