import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviousUrlService {
  private previousRoute: string = '/';
  private currentRoute!: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (this.currentRoute !== event.url) {
          this.previousRoute = this.currentRoute;
          this.currentRoute = event.url;
        }
      });
  }

  getPreviousRoute() {
    return this.previousRoute;
  }

  setPreviousUrlToHome(url: string) {
    if (this.router.url === url) {
      this.previousRoute = url;
    }
  }
}
