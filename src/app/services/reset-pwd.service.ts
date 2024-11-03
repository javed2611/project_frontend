import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resetpwd } from '../common/resetpwd';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPwdService {
  private apiUrl = "http://localhost:8082/api/customer/reset-pwd";

  constructor(private httpClient:HttpClient) { }


  resetPwd(resetPwd:Resetpwd,email:string):Observable<string>
  {
    const url = `${this.apiUrl}/${email}`;
    console.log(url);
    
    return this.httpClient.post(url,resetPwd,{responseType:'text'});
  }

}
