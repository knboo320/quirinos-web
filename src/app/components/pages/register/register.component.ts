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
  smallCpf: boolean = false;
  generalError: boolean = false;

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
    const url = 'https://20.164.18.224:3000/funcionarios/cadastro'

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
    this.generalError = false;

    if (!this.nome) {
      this.nameMissing = true;
      return;
    } else if (this.nome.startsWith(' ')) {
      this.nameMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.nome) {
      this.nameMissing = false;
      this.leadingSpace = false;

    } if (!this.email) {
      this.emailMissing = true;
      return;
    } else if (!this.email.includes('@')) {
      this.invalidEmail = true;
      return;
    } else if (this.email.startsWith(' ')) {
      this.emailMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.email) {
      this.emailMissing = false;
      this.invalidEmail = false;
      this.leadingSpace = false;


    } if (!this.senha) {
      this.passMissing = true;
      return;
    } else if (this.senha.startsWith(' ')) {
      this.passMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.senha) {
      this.passMissing = false;
      this.leadingSpace = false;

    } if (!this.cpfString) {
      this.cpfMissing = true;
      return;
    } else if (this.cpfString.length < 11) {
      this.registerSuccess = false
      this.cpfMissing = false;
      this.smallCpf = true;
      return;
    } else if (this.cpfString) {
      this.smallCpf = false;
      this.cpfMissing = false;
      this.leadingSpace = false;
    }

    this.http.post(url, data)
      .subscribe(
        (res) => {
          this.registerSuccess = true;
        },
        (err) => {
          if (err.status === 409) {
            this.alreadyExist = true;
          } else if (err.status === 500) {
            this.generalError = true;
          }
        }
      )
  }

}
