import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { PreviousUrlService } from 'src/app/services/previous-url.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  template: `<a [routerLink]="destiny"><input type="submit" value="Voltar" class="returnBtn"></a>`,
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  cpf!: number;
  newPass!: string;
  confirmPass!: string;

  newPassSuccess: boolean = false;
  generalError: boolean = false;
  differenceError: boolean = false;
  leadingSpace: boolean = false;
  destiny!: string;

  constructor(
    private forgotPass: ForgotPasswordService,
    private previousUrlService: PreviousUrlService
  ) { }

  ngOnInit() {
    const previousUrl = this.previousUrlService.getPreviousRoute();

    if (previousUrl == '/') {
      this.destiny = '/'
    } else if (previousUrl == '/home') {
      this.destiny = '/home'
    }
  }

  renewPass() {
    this.newPassSuccess = false;
    this.generalError = false;
    this.differenceError = false;

    if(this.newPass.startsWith(' ')) {
      this.leadingSpace = true;
      return
    } else if (this.newPass) {
      this.leadingSpace = false;

    } if (this.confirmPass.startsWith(' ')) {
      this.differenceError = true;
      return
    } else if (this.confirmPass) {
      this.leadingSpace = false
    }

    if (this.newPass === this.confirmPass) {
      this.forgotPass.renewPass(this.cpf, this.newPass).subscribe(response => {
        this.newPassSuccess = true;
        console.log('A senha foi mudada', response)
      },
        error => {
          this.generalError = true;
          console.error('A senha não foi mudada.', error)
        });
    } else {
      this.differenceError = true;
      console.log('As senhas não coincidem.')
    }
  }
}
