import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRoleService } from '../services/user-role.service';
import { ProductcatergorymenuComponent } from "../productcatergorymenu/productcatergorymenu.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductcatergorymenuComponent,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private userRole:UserRoleService){}
  isAdmin(): boolean {
    return this.userRole.getUserRole() === 'adminUser';
  }
}
