import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7040/api/Product';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + '/' + id)
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + '/' + product.id, product);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }
}
