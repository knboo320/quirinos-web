import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CheckupDialogComponent } from '../checkup-dialog/checkup-dialog.component';

import { faX } from '@fortawesome/free-solid-svg-icons';
import { CheckUpGetService } from 'src/app/services/check-up-get.service';

@Component({
  selector: 'app-service-form-dialog',
  templateUrl: './service-form-dialog.component.html',
  styleUrls: ['./service-form-dialog.component.scss']
})
export class ServiceFormDialogComponent {
  @Output() serviceCreated: EventEmitter<void> = new EventEmitter<void>();
  faX = faX;

  nome!: string;
  cidade!: string;
  endereco!: string;
  bairro!: string;
  complemento!: string;
  cpf!: number;
  cpfString!: string;
  id_cliente!: number;
  seguradora!: string;
  numero_da_assistencia!: number;
  numero_da_assistenciaString!: string;
  email_seguradora!: string;
  tipo_de_servico!: string;
  outro_servico: string = '';
  descricao_problema!: string;
  checkup?: null;
  status!: string;
  clienteEncontrado: any = null;
  campoDesabilitado: boolean = true;
  tipo_de_servicos_selecionados: string[] = [];

  clientSuccess: boolean = false;
  serviceSuccess: boolean = false;

  insuranceMissing: boolean = false;
  insuranceEmailMissing: boolean = false;
  assistanceMissing: boolean = false;
  nameMissing: boolean = false;
  adressMissing: boolean = false;
  neighbourhoodMissing: boolean = false;
  typeMissing: boolean = false;
  descriptionMissing: boolean = false;
  cityMissing: boolean = false;
  leadingSpace: boolean = false;
  invalidAssistance: boolean = false;
  invalidEmail: boolean = false;
  generalError: boolean = false;

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private checkupData: CheckUpGetService
  ) { }

  register() {

    this.insuranceMissing = false;
    this.insuranceEmailMissing = false;
    this.assistanceMissing = false;
    this.nameMissing = false;
    this.adressMissing = false;
    this.neighbourhoodMissing = false;
    this.typeMissing = false;
    this.descriptionMissing = false;
    this.cityMissing = false;
    this.clientSuccess = false;
    this.serviceSuccess = false;
    this.leadingSpace = false;
    this.invalidEmail = false;
    this.generalError = false;

    if (!this.seguradora) {
      this.insuranceMissing = true;
      return;
    } else if (this.seguradora.startsWith(' ')) {
      this.insuranceMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.seguradora) {
      this.insuranceMissing = false;

    } if (!this.email_seguradora) {
      this.insuranceEmailMissing = true;
      return;
    } else if (!this.email_seguradora.includes('@')) {
      this.invalidEmail = true;
      return;
    } else if (this.email_seguradora.startsWith(' ')) {
      this.insuranceEmailMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.email_seguradora) {
      this.insuranceEmailMissing = false;

    } if (!this.numero_da_assistenciaString) {
      this.assistanceMissing = true;
      return;
    } else if (isNaN(Number(this.numero_da_assistenciaString))) {
      this.assistanceMissing = false;
      this.invalidAssistance = true;
      return;
    } else if (this.numero_da_assistenciaString) {
      this.assistanceMissing = false;
      this.invalidAssistance = false;

    } if (!this.nome) {
      this.nameMissing = true;
      return;
    } else if (this.nome.startsWith(' ')) {
      this.nameMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.nome) {
      this.nameMissing = false;

    } if (!this.endereco) {
      this.adressMissing = true;
      return;
    } else if (this.endereco.startsWith(' ')) {
      this.adressMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.endereco) {
      this.adressMissing = false;

    } if (!this.bairro) {
      this.neighbourhoodMissing = true;
      return;
    } else if (this.bairro.startsWith(' ')) {
      this.neighbourhoodMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.bairro) {
      this.neighbourhoodMissing = false;

    } if (!this.cidade) {
      this.cityMissing = true;
      return;
    } else if (this.cidade.startsWith(' ')) {
      this.cityMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.cidade) {
      this.cityMissing = false;

    } if (!this.tipo_de_servico) {
      this.typeMissing = true;
      return;
    } else if (this.tipo_de_servico) {
      this.typeMissing = false;

    } if (!this.descricao_problema) {
      this.descriptionMissing = true;
      return;
    } else if (this.descricao_problema.startsWith(' ')) {
      this.descriptionMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.descricao_problema) {
      this.descriptionMissing = false;
    }

    if (this.clienteEncontrado == null) {
      this.postClient()
      this.postService()
    } else {
      this.postService()
    }

    this.checkupData.cleanData()
  }

  postClient() {
    const clientUrl = 'https://tiago4014.c35.integrator.host/api/clientes/cadastro'

    const dataClient = {
      nome: this.nome,
      cidade: this.cidade,
      endereco: this.endereco,
      bairro: this.bairro,
      complemento: this.complemento,
      cpf: this.cpf = Number(this.cpfString)
    }

    const token = localStorage.getItem('authToken')

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`)
    }

    this.http.post(clientUrl, dataClient, { headers })
      .subscribe(
        (res: any) => {
          this.id_cliente = res.dados_cliente.id_cliente;
          this.clientSuccess = true;
          this.postService()
        },
        (err) => {
          if (err.status === 500) {
            this.generalError = true;
          }
        }
      );
  }

  postService() {
    const serviceUrl = 'https://tiago4014.c35.integrator.host/api/servicos/criar'

    const concatenatedData = this.checkupData.getConcatenatedData()

    const dataService = {
      id_cliente: this.id_cliente,
      seguradora: this.seguradora,
      numero_da_assistencia: this.numero_da_assistencia = Number(this.numero_da_assistenciaString),
      email_seguradora: this.email_seguradora,
      tipo_de_servico: this.tipo_de_servico,
      descricao_problema: this.descricao_problema,
      checkup: concatenatedData,
      status: 'Pendente'
    }

    const token = localStorage.getItem('authToken')

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`)
    }

    this.http.post(serviceUrl, dataService, { headers })
      .subscribe(
        (res) => {
          this.serviceCreated.emit()
          this.serviceSuccess = true;
        },
        (err) => {
          if (err.status === 500) {
            this.generalError = true;
          }
        }
      );
  }

  getCPF() {
    if (!this.cpfString) {
      this.campoDesabilitado = true;
      return;
    }

    const token = localStorage.getItem('authToken')

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`)
    }

    const cpfURL = `https://tiago4014.c35.integrator.host/api/clientes/cpf/${this.cpfString}`

    this.http.get(cpfURL, { headers }).subscribe(
      (cpfData: any) => {
        this.clienteEncontrado = cpfData;
        this.campoDesabilitado = false;
        this.clientePreenchido();
      },
      (err) => {
        this.clienteEncontrado = null;
        this.campoDesabilitado = false;
        this.limparCliente()
      }
    );
  }

  clientePreenchido() {
    if (this.clienteEncontrado) {
      this.id_cliente = this.clienteEncontrado.dados_cliente.id_cliente
      this.nome = this.clienteEncontrado.dados_cliente.nome,
        this.cidade = this.clienteEncontrado.dados_cliente.cidade,
        this.endereco = this.clienteEncontrado.dados_cliente.endereco,
        this.bairro = this.clienteEncontrado.dados_cliente.bairro,
        this.complemento = this.clienteEncontrado.dados_cliente.complemento
    }
  }

  limparCliente() {
    if (this.clienteEncontrado == null) {
      this.id_cliente = 0,
        this.nome = '',
        this.cidade = '',
        this.endereco = '',
        this.bairro = '',
        this.complemento = ''
    }
  }

  typeSelect(event: any) {
    const serviceName = event.target.nextElementSibling?.textContent?.trim();
    if (event.target.checked) {
      if (!this.tipo_de_servicos_selecionados.includes(serviceName)) {
        this.tipo_de_servicos_selecionados.push(serviceName);
      }
      // if (!this.tipo_de_servicos_selecionados.includes(serviceName)) {
      //   this.tipo_de_servicos_selecionados.push(serviceName);
      // }
    } else {
      const index = this.tipo_de_servicos_selecionados.indexOf(serviceName);
      if (index !== -1) {
        this.tipo_de_servicos_selecionados.splice(index, 1);
      }
    }

    // Verifica se o tipo "Outro" foi preenchido e o adiciona à lista
    if (this.outro_servico.trim() !== '') {
      let servicoFormatado = `Outros: ${this.outro_servico.trim().charAt(0).toUpperCase() + this.outro_servico.trim().slice(1)}`;
      if (!this.tipo_de_servicos_selecionados.includes(servicoFormatado)) {
        this.tipo_de_servicos_selecionados.push(servicoFormatado);
      }
    }

    // Atualiza a variável tipo_de_servico com os tipos selecionados
    this.tipo_de_servico = this.tipo_de_servicos_selecionados.join(', ');

    if (serviceName === 'Check-up' && event.target.checked) {
      this.openCheckupDialog();
    }
  }

  openCheckupDialog(): void {
    const dialogRef = this.matDialog.open(CheckupDialogComponent, {
      width: '20%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
