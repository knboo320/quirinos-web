import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewIdService {

  private lastNumberService: number = 0;

  constructor() { }

  getLastNumberService(): number {
    return this.lastNumberService;
  }

  newId(): number {
    return this.lastNumberService++;
  }
}
