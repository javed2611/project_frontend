import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductcatergorymenuComponent } from "./productcatergorymenu/productcatergorymenu.component";
import { SearchComponent } from "./search/search.component";
import { CartComponent } from "./cart/cart.component";
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, RouterModule,CommonModule, ProductcatergorymenuComponent, SearchComponent, CartComponent,CheckoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce_Frontend';
  cartQuantity = 0;
  cartTotal:number = 0;

  constructor(private cartService: CartService,) {
    // Load session and cart info in the constructor
    this.cartService.loadCart();  // Restore cart from localStorage
    this.updateCartDetails();  // Initialize cart details
  }
  ngOnInit(): void {
    this.cartService.totalQuantity$.subscribe(
      (quantity) => {
        (this.cartQuantity = quantity)
      }
    );

    this.cartService.totalPrice$.subscribe(
      (totalPrice) => {
        this.cartTotal = totalPrice;
      }
    );

  }
  updateCartDetails() {
    // Sync cart totals with service
    this.cartQuantity = this.cartService.getTotalQuantity();
    this.cartTotal = this.cartService.getTotalPrice();
  }
}
