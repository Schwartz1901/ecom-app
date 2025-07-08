import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent {
   products: Product[] = [];

  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  onEdit(productId: number): void {
    this.router.navigate(['/admin/products/edit', productId]);
  }

  onDelete(productId: number): void {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      // this.productService.deleteProduct(productId);
      
      this.loadProducts(); // refresh list
    }
  }

  onAdd(): void {
    this.router.navigate(['/admin/products/new']);
  }
}
