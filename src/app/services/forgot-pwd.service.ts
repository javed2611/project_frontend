import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPwdService {

  private apiUrl = "http://localhost:8082/api/customer/forgetpassword";
  constructor(private httpClient:HttpClient) { }
  sendMail(email:string):Observable<any>{
    const url = `${this.apiUrl}/${email}`;
    console.log(url);
    
    return this.httpClient.post<any>(url,{});
  }
}
