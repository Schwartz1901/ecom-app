import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  standalone: true,
  styleUrls: ['./admin-edit-product.component.scss'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class AdminEditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string | null;

  
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject( Router)
    private productService = inject(ProductService);
  

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.initForm();

    this.productService.getProductById(this.productId!).subscribe({
      next: (product) => this.productForm.patchValue(product),
      error: (err) => console.error('Failed to load product:', err)
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      catagory: [''],
      price: [0, Validators.required],
      discountPrice: [0],
      isDiscount: [false],
      imageUrl: [''],
      imageAlt: [''],
      description: ['']
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const updatedProduct: Product = {
      id: this.productId, // <-- include the id!
      ...this.productForm.value
    };

    this.productService.updateProduct(updatedProduct).subscribe({
      next: () => this.router.navigate(['/admin/admin-products']),
      error: (err) => console.error('Update failed:', err)
    });
  }
}