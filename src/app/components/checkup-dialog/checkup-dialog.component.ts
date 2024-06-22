import { Component, EventEmitter, Output } from '@angular/core';
import { CheckUpGetService } from 'src/app/services/check-up-get.service';

import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkup-dialog',
  templateUrl: './checkup-dialog.component.html',
  styleUrls: ['./checkup-dialog.component.scss']
})
export class CheckupDialogComponent {
  @Output() checkupSelection: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private checkupGet: CheckUpGetService) { }
  faX = faX;

  messageOnClick: boolean = false;
  selectedCheckups: string[] = [];
  quantityValues: { [key: string]: number } = {};
  invalidQuantity: boolean = false;

  checkupsWithQuantity: string[] = [
    'Lubrificação de Fechaduras',
    'Limpeza de Caixa',
    'Fixação de Objetos',
    'Troca de Vidros',
    'Troca de Lâmpadas'
  ];

  toggleQuantityInput(event: any, label: string) {
    this.invalidQuantity = false;
    this.messageOnClick = false;

    if (event.target.checked) {
      this.selectedCheckups.push(label);
      if (this.checkupsWithQuantity.includes(label)) {
        this.quantityValues[label] = 0;
      }
    } else {
      const index = this.selectedCheckups.indexOf(label);
      if (index !== -1) {
        this.selectedCheckups.splice(index, 1);
        if (this.checkupsWithQuantity.includes(label)) {
          delete this.quantityValues[label];
        }
      }
    }
  }

  updateQuantityValue(label: string, event: any) {
    this.quantityValues[label] = event.target.value;
  }

  updateGlobalData() {
    let concatenatedData = '';

    this.selectedCheckups.forEach(label => {
      concatenatedData += label;

      if (this.quantityValues[label] !== undefined) {
        concatenatedData += ` (${this.quantityValues[label]})`;
      }
      if (this.selectedCheckups.indexOf(label) !== this.selectedCheckups.length - 1) {
        concatenatedData += ', ';
      }
    });
    this.checkupGet.selectedData = concatenatedData;
    this.checkupGet.setConcatenatedData(concatenatedData);
  }

  sendData() {
    this.invalidQuantity = false;
    this.messageOnClick = false;

    for (const key in this.quantityValues) {
      const value = this.quantityValues[key];
      
      // Verifica se o valor não é um número ou é menor ou igual a zero
      if (isNaN(value) || value <= 0) {
        this.invalidQuantity = true;
        this.messageOnClick = false;
        return;
      }
    }

    this.updateGlobalData();
    this.messageOnClick = true;
  }
}
