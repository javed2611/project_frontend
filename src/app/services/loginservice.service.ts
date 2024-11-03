import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../common/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRoleService } from './user-role.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private apiUrl = "http://localhost:8082/api/customer/login";
  session: any = null;
  adminEmail = 'admin@gmail.com';
  adminPassword = 'admin@123';
  private tokenKey = 'authToken';
  private userKey = 'authUser';

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router, private userRoleService: UserRoleService,private cartService:CartService) {
    this.restoreSession();
  }
  login(userData: any) {
    localStorage.setItem(this.tokenKey, userData.token);
    localStorage.setItem(this.userKey, JSON.stringify(userData.user));
    this.setUserRole(userData.user.role);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.tokenKey);
  }
  restoreSession() {
    const token = localStorage.getItem(this.tokenKey);
    const user = localStorage.getItem(this.userKey);
    if (token && user) {
      this.setUserRole(JSON.parse(user).role);
    }
    else {
      this.logout();
    }
  }
  setUserRole(role: any) {
    this.userRoleSubject.next(role);
  }
  getUserRole(): string | null {
    return this.userRoleSubject.value;
  }
  checkIfAdmin(login: Login) {
    if (this.adminEmail == login.email && this.adminPassword == login.pwd) {
      this.session = { username: 'admin' };
      return true;
    }
    return false;
  }
  checkIfValid(login: Login): Observable<any> {
    return this.httpClient.post<Login>(this.apiUrl, login);
  }
  logout() {
    this.session = null;
    this.userRoleService.setUserRole('normalUser');
    sessionStorage.removeItem('role');
    this.router.navigate(['/']);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);

    this.setUserRole(null);
    this.cartService.clearCart();
  }

}
