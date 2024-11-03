import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductcatergorymenuComponent } from "./productcatergorymenu/productcatergorymenu.component";
import { SearchComponent } from "./search/search.component";
import { CartComponent } from "./cart/cart.component";
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { LoginserviceService } from './services/loginservice.service';
import { UserRoleService } from './services/user-role.service';
import { LoginComponent } from "./login/login.component";
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterModule,
    ProductListComponent,
    CommonModule,
    ProductcatergorymenuComponent,
    SearchComponent,
    CheckoutComponent,
    LoginComponent,
    ResetPwdComponent,
    RegisterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ecommerce_Frontend';
  userRole: string = '';
  cartQuantity = 0;
  cartTotal: number = 0;

  constructor(private cartService: CartService, private loginService: LoginserviceService, private userRoleService: UserRoleService) {
    // Load session and cart info in the constructor
    this.loginService.restoreSession();
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
    this.userRole = this.userRoleService.getUserRole();

    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role;
    })
  }
  updateCartDetails() {
    // Sync cart totals with service
    this.cartQuantity = this.cartService.getTotalQuantity();
    this.cartTotal = this.cartService.getTotalPrice();
  }
}
