import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AskQuestionDialogComponent } from 'src/app/dialogs/ask-question-dialog/ask-question-dialog.component';
import { AboutDialogComponent } from 'src/app/dialogs/about-dialog/about-dialog.component';
import { DisclaimerDialogComponent } from 'src/app/dialogs/disclaimer-dialog/disclaimer-dialog.component';
export interface DialogData {
  title: string;
  content: string;
  candidates: [string];
}
@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar-component.component.html',
  styleUrls: ['./sidebar-component.component.scss']
})
export class SidebarComponentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  createQuestion() {
    this.openDialog()
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AskQuestionDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }


  showAbout() {
    const dialogRef = this.dialog.open(AboutDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  showDisclaimer() {
    const dialogRef = this.dialog.open(DisclaimerDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

}
