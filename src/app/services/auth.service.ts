import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static loggedIn = new BehaviorSubject<boolean>(false);

  // Observable to expose the login state
  isLoggedIn = AuthService.loggedIn.asObservable();

  constructor(
    private cookie: CookieService,
    private router: Router
  ) {
    // Optional: Initialize login state (e.g., from a stored token)
    this.checkLoginStatus();
  }

  // Method to update the state when the user logs in
  login(): void {
    AuthService.loggedIn.next(true);
  }

  // Method to update the state when the user logs out
  logout(): void {
    AuthService.loggedIn.next(false);
    this.cookie.delete('token');
  }

  // Check login state from localStorage or another persistent source
  checkLoginStatus(): void {
    if(this.cookie.get('token')){
      const token = this.cookie.get('token');
      AuthService.loggedIn.next(!!token); // Update the state based on token presence
    } else{
      this.router.navigateByUrl("/login");
    }
  }
  
}
