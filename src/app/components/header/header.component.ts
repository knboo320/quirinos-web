import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor (private router: Router, private titleService: Title) {}
  userName: string | null = null;

  ngOnInit(): void {
    this.userName = localStorage.getItem('authName')
  }

  faUser = faUser;
  faUserCircle = faUserCircle;

  logout() {
    localStorage.removeItem('authToken');
    this.titleService.setTitle("Quirino's - Login")
    this.router.navigate(['']);
  }

  decreaseUserName(userName: string | null): string {
    if (userName && userName.length > 45) {
      return userName.slice(0, 45) + '...';
    }
    return userName || '';
  }

  decreaseBoxUserName(userName: string | null): string {
    if (userName && userName.length > 12) {
      return userName.slice(0, 12) + '...';
    }
    return userName || '';
  }

}