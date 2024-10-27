import { Component, NgZone, OnInit } from '@angular/core';
import { OrderItem } from '../common/order-item';
import { Customer } from '../common/customer';
import { Address } from '../common/address';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';
import { CartItems } from '../common/cart-items';
import { Order } from '../common/order';
import { Purchase } from '../common/purchase';
import { PaymentVerficationPayload } from '../common/payment-verfication-payload';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var Razorpay: any; // Declare Razorpay


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  totalQuantity: number = 0;
  totalPrice: number = 0;
  cartItems: OrderItem[] = [];

  orderTrackingId: number = 0;
  paymentSuccess: boolean = false;

  customer: Customer = new Customer("", "", "");
  address: Address = new Address("", "", "", "", "","");

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    private ngZone: NgZone
  ) { }
  ngOnInit(): void {
    const cartItems: CartItems[] = this.cartService.getCartItems();
    this.cartItems = cartItems.map(item => new OrderItem(item.imageUrl, item.name, item.quantity, item.unitPrice));
    this.totalQuantity = this.cartService.getTotalQuantity();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  onSubmit() {
    let order: Order = new Order(this.totalQuantity, this.totalPrice);
    let orderItems: OrderItem[] = this.cartItems.map(item => new OrderItem(item.imageUrl, item.prodName, item.quantity, item.unitPrice));
    let purchase = new Purchase();
    purchase.customer = this.customer;
    purchase.address = this.address;
    purchase.order = order;
    purchase.orderItems = orderItems;
    let paymentVerificationPayload = new PaymentVerficationPayload("", "", "");
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          const razorpayOrderId = response.razorpayOrderId;
          const amount = this.totalPrice;
          this.orderTrackingId = response.orderTrackingNumber;
          this.initiateRazorpayPayment(razorpayOrderId, amount);
        },
        error: err => {
          console.error('Error placing order', err);
        }
      });
  }
  initiateRazorpayPayment(razorpayOrderId: string, amount: number) {
    console.log('Entering initiateRazorpayPayment method');
    const options = {
      key: 'rzp_test_9Rv894lScSIEg0', // Enter the Key ID generated from the Razorpay Dashboard
      amount: amount * 100, // Amount is in currency subunits (i.e., paise for INR)
      currency: 'INR',
      name: 'JK Infotech',
      description: 'Ecommerce-Order',
      order_id: razorpayOrderId, // Use the Razorpay order ID returned from the backend
      prefill: {
        name: this.customer.name,
        email: this.customer.email,
        contact: this.customer.phno
      },
      handler: (response: any) => {
        if (response && response.razorpay_payment_id && response.razorpay_signature) {
          console.log('Payment response in handler :', response);

          const paymentPayload = {
            razorpayOrderId: razorpayOrderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          };
          this.verifyPayment(paymentPayload);

        } else {
          this.ngZone.run(() => {
            this.paymentSuccess = false;
            console.error('Payment failed or no payment ID received.');
          });

        }
      },

    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  }
  verifyPayment(paymentPayload: PaymentVerficationPayload) {
    this.checkoutService.verifyPayment(paymentPayload).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.paymentSuccess = true;
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.paymentSuccess = false;
        });
      }
    });
  }

  continueShopping() {
    this.paymentSuccess = false;
    this.cartService.clearCart();
    this.router.navigateByUrl('/shop');
  }



}
