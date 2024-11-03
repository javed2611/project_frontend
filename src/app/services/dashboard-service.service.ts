import { Injectable } from '@angular/core';
import { OrderResponse } from '../common/order-response';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Dashboard } from '../common/dashboard';
import { OrderHistory } from '../common/order-history';
import { ProductResponse } from '../common/product-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  private dashBoardAPIUrl = 'http://localhost:8083/api/admin/dashboard';
  public filterAPIUrl = 'http://localhost:8083/api/admin/filter';
  public productUrl = 'http://localhost:8083/api/admin/orderItems?orderId=';
  public orderResponse: OrderResponse[] = [];
  constructor(private httpClient :HttpClient) { }
  public getDashboardDetails():Observable<Dashboard>{
    return this.httpClient.get<Dashboard>(this.dashBoardAPIUrl).pipe(map(response=>response));
  }
  public searchForOrders(orderHistory?:OrderHistory):Observable<OrderResponse[]>{
    return this.httpClient.post<OrderResponse[]>(this.filterAPIUrl,orderHistory);
  }
  public fetchProductData(orderId:number):Observable<ProductResponse[]>{
    this.productUrl = this.productUrl + orderId;
    return this.httpClient.get<ProductResponse[]>(this.productUrl).pipe(map(response=>response));
  }
}
