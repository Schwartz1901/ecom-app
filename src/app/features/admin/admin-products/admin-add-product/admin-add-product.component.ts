import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../shared/services/product.service';
import {Product} from '../../../../shared/models/product.model';

@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddProductComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  productForm = this.fb.group({
    name: ['', Validators.required],
    catagory: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    discountPrice: [0],
    isDiscount: [false],
    imageUrl: ['', Validators.required],
    imageAlt: [''],
    description: ['']
  });

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      const newProduct: Product = {
        id: undefined,
        name: formValue.name ?? '',
        catagory: (formValue.catagory ?? '').split(',').map(c => c.trim()),
        price: formValue.price ?? 0,
        discountPrice: formValue.discountPrice ?? 0,
        isDiscount: formValue.isDiscount ?? false,
        imageUrl: formValue.imageUrl ?? '',
        imageAlt: formValue.imageAlt ?? '',
        description: formValue.description ?? ''
      };

      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          alert('Product added successfully!'),
          this.router.navigate(['/admin-products'])
        },
        error: (err) => console.error('Add product failed:', err)
      });
    }
  }
}
