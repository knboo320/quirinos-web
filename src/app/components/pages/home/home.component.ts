import { Component, OnInit } from '@angular/core';
import { ServiceFormDialogComponent } from '../../service-form-dialog/service-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faCalendar = faCalendar;

  constructor(
    private matDialog:MatDialog,
    ) {}

  openDialog() {
    this.matDialog.open(ServiceFormDialogComponent, {
      width: '88.875rem',
      height: '37.625rem',
    })
  }

}
