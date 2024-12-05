import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/funcionarios/login'

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}
