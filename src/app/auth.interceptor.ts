import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
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
