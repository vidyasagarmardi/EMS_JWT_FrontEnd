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

  addEmployee(emp: any) : Observable<any>{
    return this.http.post(this.base_url+'save',emp);
  }

  updateEmployee(emp: any, id: number) : Observable<any>{
    return this.http.put(this.base_url+`update/${id}`,emp);
  }

  getEmployees() : Observable<any>{
    return this.http.get(this.base_url+'getAll');
  }

  deleteEmployee(id: number) : Observable<any>{
    return this.http.delete(this.base_url+`delete/${id}`);
  }
  
}
