import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LogindetailsComponent } from './logindetails/logindetails.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ProductcatergorymenuComponent } from './productcatergorymenu/productcatergorymenu.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminFilterSearchComponent } from './admin-filter-search/admin-filter-search.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';


export const routes: Routes = [
    { path: 'cart', component: CartComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'category/:id', component: ProductListComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'login-details', component: LogindetailsComponent },
    { path: 'order-details/:email', component: OrderdetailsComponent },
    { path: 'product-category', component: ProductcatergorymenuComponent },
    { path: 'admindashboard', component: AdmindashboardComponent },
    { path: 'forgotpwd', component: ForgotPwdComponent },
    { path: 'reset-pwd/:email', component: ResetPwdComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'filterOrders', component: AdminFilterSearchComponent },
    { path: 'viewProduct/:orderId', component: ViewproductComponent },
  
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' },
];