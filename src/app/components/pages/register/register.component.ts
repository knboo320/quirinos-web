import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreviousUrlService } from 'src/app/services/previous-url.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})  
export class RegisterComponent implements OnInit {

  nome!: string;
  email!: string;
  cpf!: number;
  cpfString!: string;
  senha!: string;

  registerSuccess: boolean = false;
  nameMissing: boolean = false;
  emailMissing: boolean = false;
  passMissing: boolean = false;
  cpfMissing: boolean = false;
  invalidEmail: boolean = false;
  alreadyExist: boolean = false;
  leadingSpace: boolean = false;

  destiny!: string;

  constructor(private http: HttpClient, private previousUrlService: PreviousUrlService) { }

  ngOnInit() {
    const previousUrl = this.previousUrlService.getPreviousRoute();

    if (previousUrl == '/') {
      this.destiny = '/'
    } else if (previousUrl == '/home') {
      this.destiny = '/home'
    }
  }

  postEmployee() {
    const url = 'http://localhost:3000/funcionarios/cadastro'

    const data = {
      nome: this.nome,
      email: this.email,
      cpf: this.cpf = Number(this.cpfString),
      senha: this.senha
    }

    this.registerSuccess = false;
    this.alreadyExist = false;
    this.invalidEmail = false;
    this.nameMissing = false;
    this.emailMissing = false;
    this.passMissing = false;
    this.cpfMissing = false;
    this.leadingSpace = false;

    if(!this.nome) {
      this.nameMissing = true;
      return;
    } else if (this.nome.startsWith(' ')) {
      this.nameMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.nome) {
      this.nameMissing = false;

    } if (!this.email) {
      this.emailMissing = true;
      return;
    } else if (!this.email.includes('@')) {
      this.invalidEmail = true;
      return;
    } else {
      this.emailMissing = false;
      this.invalidEmail = false;
      this.leadingSpace = false;


    } if(!this.senha) {
      this.passMissing = true;
      return;
    } else if (this.senha.startsWith(' ')) {
      this.passMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.senha) {
      this.passMissing = false;

    } if(!this.cpf) {
      this.cpfMissing = true;
      return;
    } else if (this.cpf) {
      this.cpfMissing = false;
    }

    this.http.post(url, data)
    .subscribe(
      (res) => {
        this.registerSuccess = true;
        console.log('Resposta da solicitação POST:', res);
      },
      (err) => {
        if (err.status === 409) {
          this.alreadyExist = true;
        }
        console.error('Erro ao enviar a solicitação POST:', err);
      }
    )
  }
  
}
