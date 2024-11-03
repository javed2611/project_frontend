import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  private userRole = new BehaviorSubject<string>(this.getInitialRole());
  userRole$ =this.userRole.asObservable();
  constructor() { }

  setUserRole(role: string) {
    sessionStorage.setItem('role', role);
    this.userRole.next(role);
  }

  getUserRole(): string {
    return this.userRole.getValue();
  }

  private getInitialRole(): string {
    return sessionStorage.getItem('role') || 'normalUser';
  }
}
