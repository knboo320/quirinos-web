import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RegisterEmailComponent } from './components/pages/register-email/register-email.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'novo-funcionario', component: RegisterComponent},
  {path: 'renovar-senha', component: NewPasswordComponent},
  {path: 'novo-email', component: RegisterEmailComponent, canActivate: [authGuard]},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
