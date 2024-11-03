import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../common/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = "http://localhost:8082/api/customer/register";

  constructor(private httpClient: HttpClient) { }
  register(register: Register): Observable<string> {
    return this.httpClient.post(this.apiUrl, register,{ responseType: 'text' });
  }
}
