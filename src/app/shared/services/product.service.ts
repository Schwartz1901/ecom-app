import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7123/product';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }


  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  addProduct(productForm: FormData): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, productForm);
  }
  updateProduct(id: string, fd: FormData): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + '/' + id, fd);
  }
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/' + id);
  }
}
