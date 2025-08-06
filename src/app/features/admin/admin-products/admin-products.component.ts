import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { CommonModule } from '@angular/common';

import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'] 
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  productForm = this.fb.group({
    name: ['', Validators.required],
    categories: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discountPrice: [0],
    isDiscount: [false],
    imageUrl: [''],
    imageAlt: [''],
    description: ['']
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  onEdit(productId: string): void {
    this.router.navigate(['admin/admin-products/edit/', productId]);
  }

  onDelete(productId: string): void {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (confirmed) {
     
      this.productService.deleteProduct(productId).subscribe(() => this.loadProducts());

      console.log(`Pretending to delete product with ID: ${productId}`);
      this.loadProducts(); // refresh list
    }
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      const newProduct: Product = {
        id: undefined,
        name: formValue.name ?? '',
        categories: (formValue.categories ?? '').split(',').map(c => c.trim()),
        price: formValue.price ?? 0,
        discountPrice: formValue.discountPrice ?? 0,
        isDiscount: formValue.isDiscount ?? false,
        imageUrl: formValue.imageUrl ?? '',
        imageAlt: formValue.imageAlt ?? '',
        description: formValue.description ?? ''
      };

      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          
          this.productForm.reset(); // Clear form
          this.loadProducts(); 
        },
        error: (err) => {
          alert('Product added successfully!');
          console.error('Add product failed:', err);
        }
      });
    }
  }
  onFormClose(): void {
    this.loadProducts(); 
  }
}
