import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookie: CookieService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookie.get('token');
    console.log("auth token :",token);
    let authreq = request;
    if(token){
      authreq = request.clone({
        setHeaders : {
          Authorization : `Bearer ${token}`,
        },
      });
    }
    return next.handle(authreq);
  }
}
