import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  renewPass(cpf: number, newPass: string) {
    const url = 'http://localhost:3000/funcionarios/esqueciSenha';
    const body = {
      cpf: cpf,
      editar_senha: true,
      senha: newPass
    };

    const token = localStorage.getItem('authToken');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put(url, body, { headers });
  }
}
