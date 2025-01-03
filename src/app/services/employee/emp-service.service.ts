import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  private base_url = "http://localhost:8060/api/employee/";

  constructor(
    private http : HttpClient
  ){}

  login(loginReq:any) : Observable<any>{
    return this.http.post(this.base_url+'authentication',loginReq);
  }

  // getEmployees() : Observable<any>{
  //   return this.http.get(this.base_url+'getAll',{
  //     headers : this.createAuthHeader()
  //   });
  // }

  createAuthHeader(){
    const token = localStorage.getItem('token');
    if(token){
      return new HttpHeaders().set(
        "Authorization","Bearer"+token
      )
    } else{
      console.log("No token found in localstorage");
    }
    return null;
  }
  
}
