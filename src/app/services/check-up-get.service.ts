import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckUpGetService {
  private concatenatedData: string = '';

  selectedData: string = ''
  quantityValues: { [key: string]: string } = {}

  setConcatenatedData(data: string) {
    this.concatenatedData = data;
  }

  getConcatenatedData() {
    return this.concatenatedData;
  }

  cleanData() {
    this.concatenatedData = ''
  }

  constructor() { }
}
