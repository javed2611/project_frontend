import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dashboard } from '../common/dashboard';
import { OrderHistory } from '../common/order-history';
import { OrderResponse } from '../common/order-response';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent implements OnInit {
  dashboard: Dashboard;
  orderHistory: OrderHistory = new OrderHistory();
  orders: OrderResponse[] = [];
  constructor(public dashboardService: DashboardServiceService) {
    this.dashboard = {
      customersCount: 0,
      ordersCount: 0,
      amountCollected: 0,
      productCount: 0
    };
  }
  ngOnInit(): void {
    this.getDashboardData();
    this.filterOrders();
  }
  getDashboardData() {
    this.dashboardService.getDashboardDetails().subscribe(data => {
      this.dashboard = data;
    });
  }
  filterOrders() {
    this.dashboardService.searchForOrders(this.orderHistory).
      subscribe((data: OrderResponse[]) => {
        this.orders = data;
      });
  }
}
