import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { CommonModule } from '@angular/common';

import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, AdminAddProductComponent],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'] 
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];

  private productService = inject(ProductService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  onEdit(productId: number): void {
    this.router.navigate(['admin/admin-products/edit/', productId]);
  }

  onDelete(productId: number): void {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (confirmed) {
     
      this.productService.deleteProduct(productId).subscribe(() => this.loadProducts());

      console.log(`Pretending to delete product with ID: ${productId}`);
      this.loadProducts(); // refresh list
    }
  }

  showAddForm = false;

  onAdd(): void {
    this.showAddForm = true;
  }

  onFormClose(): void {
    this.showAddForm = false;
    this.loadProducts(); // refresh table after add
  }
}
