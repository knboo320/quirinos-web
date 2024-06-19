import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CleanCheckupService {
  private resetSubject = new Subject<void>();

  resetObservable$ = this.resetSubject.asObservable();

  requestReset() {
    this.resetSubject.next();
  }

  constructor() { }
}
