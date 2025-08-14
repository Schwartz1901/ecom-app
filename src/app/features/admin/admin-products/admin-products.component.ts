import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // removed FileUploadComponent
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // DI
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  // state
  products: Product[] = [];
  uploading = false;
  uploadProgress = 0;
  fileError = '';
  previewUrl: string | null = null;
  selectedFile: File | null = null;

  // form
  productForm = this.fb.group({
    name: ['', Validators.required],
    categories: ['', Validators.required], // comma-separated
    price: [0, [Validators.required, Validators.min(0)]],
    discountPrice: [0],
    isDiscount: [false],
    image: [null as File | null],          // <- File object goes here
    description: [''],
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Failed to load products:', err),
    });
  }

  onEdit(productId: string): void {
    this.router.navigate(['admin/admin-products/edit/', productId]);
  }

  onDelete(productId: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Delete failed:', err),
    });
  }

  // <input type="file" (change)="onFileSelected($event)">
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    this.fileError = '';
    if (!file) {
      this.clearImage();
      return;
    }

    // Validate type + size
    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowed.includes(file.type)) {
      this.fileError = 'Only PNG, JPG, or WebP images are allowed.';
      input.value = '';
      return;
    }
    if (file.size > maxSize) {
      this.fileError = 'Image must be ≤ 5MB.';
      input.value = '';
      return;
    }

    // Preview (revoke old URL to avoid leaks)
    if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = URL.createObjectURL(file);

    this.selectedFile = file;
    this.productForm.patchValue({ image: file });
  }

  clearImage(): void {
    this.selectedFile = null;
    this.productForm.patchValue({ image: null });
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    this.uploading = true;
    this.fileError = '';

    const v = this.productForm.value;
    const formData = new FormData();

    // Append primitives as strings for FormData
    formData.append('name', v.name ?? '');
    formData.append('categories', v.categories ?? '');
    formData.append('price', String(v.price ?? 0));
    formData.append('discountPrice', String(v.discountPrice ?? 0));
    formData.append('isDiscount', String(!!v.isDiscount));
    formData.append('description', v.description ?? '');

    // Append file if present
    if (v.image instanceof File) {
      formData.append('image', v.image, v.image.name);
    }

    this.productService.addProduct(formData).subscribe({
      next: () => {
        // reset form & UI
        
        this.productForm.reset({
          name: '',
          categories: '',
          price: 0,
          discountPrice: 0,
          isDiscount: false,
          image: null,
          description: '',
        });
        this.clearImage();
        this.loadProducts();
        this.uploading = false;
      },
      error: (err) => {
        console.error(err);
        this.uploading = false;
        this.fileError = 'Failed to create product.';
      },
    });
  }

  onFormClose(): void {
    this.loadProducts();
  }
}
