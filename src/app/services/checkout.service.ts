import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';
import { PaymentVerficationPayload } from '../common/payment-verfication-payload';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private checkoutUrl = 'http://localhost:8081/api/orders/create-order';
  private paymentCallbackUrl = 'http://localhost:8081/api/orders/payment-verification';

  constructor(private httpClient:HttpClient) { }

  placeOrder(purchase:Purchase):Observable<any>
  {
    return this.httpClient.post<any>(this.checkoutUrl,purchase);
  }

  verifyPayment(paymentPayload:PaymentVerficationPayload):Observable<any>
  {
    return this.httpClient.post<any>(this.paymentCallbackUrl,paymentPayload);
  }

}
