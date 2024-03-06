import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';

import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-service-form-dialog',
  templateUrl: './service-form-dialog.component.html',
  styleUrls: ['./service-form-dialog.component.scss']
})
export class ServiceFormDialogComponent {

  faX = faX;

}
