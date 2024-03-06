import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl1 = 'http://10.91.249.10:3000/clientes/cadastro';
  private apiUrl2 = 'http://10.91.249.10:3000/servicos/criar';

  constructor(private http: HttpClient) {}

  sendDataPart1(data: any): Observable<any> {
    return this.http.post(this.apiUrl1, data);
  }

  sendDataPart2(data: any): Observable<any> {
    return this.http.post(this.apiUrl2, data);
  }
}