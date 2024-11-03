import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewproductComponent } from '../viewproduct/viewproduct.component';
import { Router, RouterModule } from '@angular/router';
import { OrderHistory } from '../common/order-history';
import { OrderResponse } from '../common/order-response';
import { DashboardServiceService } from '../services/dashboard-service.service';


@Component({
  selector: 'app-admin-filter-search',
  standalone: true,
  imports: [FormsModule, CommonModule, ViewproductComponent, RouterModule],
  templateUrl: './admin-filter-search.component.html',
  styleUrl: './admin-filter-search.component.css'
})
export class AdminFilterSearchComponent implements OnInit {
  orderHistory: OrderHistory = new OrderHistory();
  orders: OrderResponse[] = [];
  sendOrderId: number = 0;
  constructor(
    public dashboardService: DashboardServiceService,
    private router: Router
  ) { }
  ngOnInit(): void {

  }
  filterOrders() {
    this.dashboardService.searchForOrders(this.orderHistory)
      .subscribe((data: OrderResponse[]) => {
        this.orders = data;
      });
  }

  getProduct(orderId:number)
  {
    this.router.navigateByUrl(`/viewProduct/${orderId}`);
  }
}
