import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserroleserviceService } from './userroleservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from '../common/login';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService  {
  private apiUrl = "http://localhost:8082/api/customer/login";
  session: any = null;
  adminEmail = 'admin@gmail.com';
  adminPassword = 'admin@123';
  private tokenKey = '';
}
