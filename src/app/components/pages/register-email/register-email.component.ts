import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent {
  email!: string;
  senha!: string;

  emailSuccess: boolean = false;
  emailMissing: boolean = false;
  passMissing: boolean = false;
  leadingSpace: boolean = false;
  invalidEmail: boolean = false;

  constructor(private http: HttpClient) { }

  postEmail() {
    const url = 'https://tiago4014.c35.integrator.host/api/email/configurar'

    const data = {
      email: this.email,
      senha: this.senha
    }

    const token = localStorage.getItem('authToken')

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`)
    }

    this.emailSuccess = false
    this.emailMissing = false
    this.passMissing = false
    this.leadingSpace = false;
    this.invalidEmail = false;

    if (!this.email) {
      this.emailMissing = true;
      return;
    } else if (this.email.startsWith(' ')) {
      this.emailMissing = false;
      this.leadingSpace = true;
      return;
    } else if (!this.email.includes('@')) {
      this.invalidEmail = true;
      return;
    } else if (this.email) {
      this.emailMissing = false;

    } if (!this.senha) {
      this.passMissing = true;
      return;
    } else if (this.senha.startsWith(' ')) {
      this.passMissing = false;
      this.leadingSpace = true;
      return;
    } else if (this.senha) {
      this.passMissing = false;
    }

    this.http.post(url, data, { headers }).subscribe(
      (res) => {
        this.emailSuccess = true;
      },
      (err) => {
        this.emailSuccess = false;
      }
    )
  }

}
