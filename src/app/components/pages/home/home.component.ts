import { Component, OnInit } from '@angular/core';
import { ServiceFormDialogComponent } from '../../service-form-dialog/service-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PreviousUrlService } from 'src/app/services/previous-url.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faCalendar = faCalendar;
  faX = faX;
  responseData: any;
  selectedService: any;
  selectedListService: any;
  selectedClient: any;
  dialogRef: any;
  reloadInterval: any;
  selectedDate!: Date;
  currentData!: string;
  noServiceFound: boolean = false;
  noServiceByIdFound: boolean = false;
  serviceNumber: string = '';
  serviceStatus: string = '';

  constructor(
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private datePipe: DatePipe,
    private previousRoute: PreviousUrlService,
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this._renderer.setStyle(document.body, 'overflow', 'hidden');
    this.previousRoute.setPreviousUrlToHome('/home')
    this.fetchServiceData();
  }

  ngOnDestroy(): void {
    clearInterval(this.reloadInterval);
  }

  openDialog() {
    this.dialogRef = this.matDialog.open(ServiceFormDialogComponent, {
      width: '88.875rem',
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.fetchServiceData()
    })
  }

  fetchServiceData() {
    if (this.selectedDate) {
      this.currentData = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd') || '';
    } else {
      this.currentData = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
    }

    // Ler o token do LocalStorage
    const token = localStorage.getItem('authToken');

    // Configurar os headers com o token
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Adicionar os headers na requisição HTTP GET
    this.httpClient.get(`https://tiago4014.c35.integrator.host/api/servicos/filtrar/data/${this.currentData}`, { headers })
      .subscribe(
        (response) => {
          this.responseData = response;
          if (!this.responseData || !this.responseData.servicos || this.responseData.servicos.length === 0) {
            this.noServiceFound = true;
          } else {
            this.noServiceFound = false;
          }
        },
        (error) => {
          this.noServiceFound = true;
        }
      );
  }

  onDateChange() {
    this.fetchServiceData();
  }

  fetchClient(idCliente: string) {
    const url = `https://tiago4014.c35.integrator.host/api/clientes/id/${idCliente}`;

    // Ler o token do LocalStorage
    const token = localStorage.getItem('authToken');

    // Configurar os headers com o token
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Adicionar os headers na requisição HTTP GET
    this.httpClient.get(url, { headers }).subscribe(
      (response) => {
        this.selectedClient = response;
      },
      (error) => {
      }
    );
  }

  fetchService(idServico: string) {
    const url = `https://tiago4014.c35.integrator.host/api/servicos/id/${idServico}`; // Substitua pelo seu URL de destino
    // Ler o token do LocalStorage
    const token = localStorage.getItem('authToken');

    // Configurar os headers com o token
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    this.httpClient.get(url, { headers }).subscribe(
      (response) => {
        this.selectedListService = response
      },
      (error) => {
      }
    );
  }

  fetchServiceById() {
    this.noServiceByIdFound = false;

    if (!this.serviceNumber) {
      this.noServiceByIdFound = true;
      return;
    } else if (this.serviceNumber) {
      this.closeDetails()
    }

    // Ler o token do LocalStorage
    const token = localStorage.getItem('authToken');

    // Configurar os headers com o token
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    this.httpClient.get(`https://tiago4014.c35.integrator.host/api/servicos/filtrar/id/${this.serviceNumber}`, { headers }).subscribe((response) => {
      this.responseData = response;
      this.noServiceFound = false; // Certifique-se de definir noServiceFound como false
    },
      (error) => {
        this.noServiceByIdFound = true;
      });
  }

  handleDetailsToggle(event: Event) {
    const details = event.target as HTMLDetailsElement;
    if (!details.open) {
      this.noServiceByIdFound = false;
    }
  }

  fetchServiceByStatus() {
    if (this.serviceStatus === 'todos') {
      this.fetchServiceData();
      return;
    }

    let statusFilterUrl = 'https://tiago4014.c35.integrator.host/api/servicos/filtrar/status/';

    // Ler o token do LocalStorage
    const token = localStorage.getItem('authToken');

    // Configurar os headers com o token
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    switch (this.serviceStatus) {
      case 'concluido':
        statusFilterUrl += 'concluido';
        break;
      case 'pendente':
        statusFilterUrl += 'pendente';
        break;
      case 'em_andamento':
        statusFilterUrl += 'em_andamento';
        break;
      default:
        return;
    }

    this.httpClient.get(statusFilterUrl, { headers }).subscribe((response) => {
      if (this.responseData && this.responseData.servicos && this.responseData.servicos.length > 0) {
        this.responseData = response;
        this.noServiceFound = false;
      } else {
        this.responseData = null; // Limpa a lista
        this.noServiceFound = true;
      }
    },
      (error) => {
        this.noServiceFound = true;
      });
  }

  allServices(event: any) {
    this.noServiceByIdFound = false;
    this.fetchServiceData();
  }

  fetchServiceByType(event: any) {
    const serviceType = event?.target?.value;
    if (serviceType) {
      // Ler o token do LocalStorage
      const token = localStorage.getItem('authToken');

      // Configurar os headers com o token
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      const url = `https://tiago4014.c35.integrator.host/api/servicos/filtrar/tipo/${serviceType}`;
      this.httpClient.get(url, { headers }).subscribe(
        (response) => {
          this.responseData = response;
          if (!this.responseData || !this.responseData.servicos || this.responseData.servicos.length === 0) {
            this.noServiceFound = true;
          } else {
            this.noServiceFound = false;
          }
        },
        (error) => {
          this.noServiceFound = true;
        }
      );
    }
  }

  showDetails(order: any) {
    this.selectedService = order;
    if (this.selectedService.status === 'Concluído' || this.selectedService.status === 'Concluido') {
      const urlPdf = this.selectedService.pdf.url_pdf
      window.open(urlPdf, '_blank')
      this.selectedService = null;
    } else {
      this.fetchClient(order.id_cliente)
      this.fetchService(order.id_servico);
    }
  }

  closeDetails() {
    this.selectedService = null;
  }

  decreaseServiceTitle(title: string): string {
    if (title.length > 26) {
      return title.slice(0, 26) + '...';
    }
    return title;
  }

  decreaseServiceOpenedTitle(title: string): string {
    if (title.length > 24) {
      return title.slice(0, 24) + '...';
    }
    return title;
  }

  decreaseServiceEnsurance(ensurance: string): string {
    if (ensurance.length > 36) {
      return ensurance.slice(0, 36) + '...'
    }
    return ensurance;
  }
}
