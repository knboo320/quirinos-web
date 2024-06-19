import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    cpf: '',
    senha: ''
  }

  invalidError = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        // this.router.navigate(['/home']);
        if(res && res.token) {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('authName', res.nome);
          this.router.navigate(['/home']);
        } else {
          this.invalidError = true;
        }
      },
      error: (err) => {
        console.log(err);
        if (err.status === 404 || err.status === 401) {
          this.invalidError = true;
        }
      }
    });
  }

}
