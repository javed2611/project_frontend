import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { Productcategory } from '../common/productcategory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productcatergorymenu',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './productcatergorymenu.component.html',
  styleUrl: './productcatergorymenu.component.css'
})
export class ProductcatergorymenuComponent implements OnInit{
  productcatergories:Productcategory[] = [];
  constructor(private productservice:ProductService){}
  ngOnInit(): void {
    this.listProductCategories();
  }

  

  listProductCategories(){
    this.productservice.getProductCategories().subscribe(
      data =>{
        this.productcatergories = data;
      }
    )
  }
}
