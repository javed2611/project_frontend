import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../common/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  constructor(private prodService: ProductService, private route: ActivatedRoute,private cartService : CartService) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    const prodId: number = +this.route.snapshot.paramMap.get('id')!;
    this.prodService.getProduct(prodId).subscribe(data => this.product = data);
  }
  addToCart() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      unitPrice: this.product.unitPrice,
      imageUrl: this.product.imageUrl,
      quantity: 1,
    });
  }
}
