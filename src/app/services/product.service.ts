import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { Productcategory } from '../common/productcategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];
  private apiUrl = "http://localhost:8080/api/products";
  private apiUrlCategory = "http://localhost:8080/api/product-category";
  constructor(private httpClient: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.apiUrl)
      .pipe(map(response => response._embedded.products));
  }
  getProductsByCategory(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.httpClient.get<GetResponse>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }
  getProductCategories(): Observable<Productcategory[]> {
    return this.httpClient.get<GetCategoriesResponse>(this.apiUrlCategory).pipe(map(response => response._embedded.productCategories));
  }
  searchProducts(theValue: string): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}/search/findByNameContaining?name=${theValue}`;
    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response => response._embedded.products));
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
interface GetCategoriesResponse {
  _embedded: {
    productCategories: Productcategory[];
  }
}