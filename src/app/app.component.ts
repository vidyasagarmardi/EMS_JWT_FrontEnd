import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'EMS_JWT';
  isLoggedIn = false;

  constructor(
    public authService : AuthService,
    private router : Router,
    private cdr : ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      status => {
        this.isLoggedIn = status;
        this.cdr.detectChanges();
      }
    );
    this.authService.checkLoginStatus();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
