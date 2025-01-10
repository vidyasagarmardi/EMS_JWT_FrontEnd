import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn = AuthService.loggedIn.asObservable();

  constructor(
    private cookie: CookieService,
    private router: Router
  ) {
    this.checkLoginStatus();
  }

  login(): void {
    AuthService.loggedIn.next(true);
  }

  logout(): void {
    AuthService.loggedIn.next(false);
    this.cookie.delete('token');
  }

  checkLoginStatus(): void {
    if(this.cookie.get('token')){
      const token = this.cookie.get('token');
      AuthService.loggedIn.next(!!token);
    } else{
      this.router.navigateByUrl("/login");
    }
  }
  
}
