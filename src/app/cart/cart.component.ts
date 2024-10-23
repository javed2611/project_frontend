import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItems } from '../common/cart-items';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: CartItems[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router:Router) {}

  ngOnInit(): void {
    this.loadCartDetails();
  }
  updateQuantity(id: number, quantity: number) {
    this.cartService.updateItemQuantity(id, quantity);
    this.loadCartDetails(); // Refresh cart items and total price after quantity update
    
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item.id);
    this.loadCartDetails(); // Refresh cart items and total price after removing
  }

  loadCartDetails() {
    this.items = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
  }

  getTotalQuantity(): number {
    return this.items.reduce((totals, item) => totals + item.quantity, 0);
  }
  
}
