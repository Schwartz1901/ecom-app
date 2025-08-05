import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { CartService } from '../../../shared/services/cart.service';
import { PageNotFoundComponent } from '../../../components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [PageNotFoundComponent, FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'] 
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product?: Product;
  quantity: number = 1;

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (!id) {
    console.error('No product ID in route');
    return;
  }

  this.productService.getProductById(id).subscribe({
    next: (product) => {
      this.product = product;
    },
    error: (err) => {
      console.error('Failed to load product', err);
      this.product = undefined;
    }
  });
}
  increase(): void {
    if (this.quantity < 99) this.quantity++;
  }

  decrease(): void {
    if (this.quantity > 1) this.quantity--;
  }

  onQuantityChange(): void {
    if (this.quantity < 1) this.quantity = 1;
    if (this.quantity > 99) this.quantity = 99;
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addFromProduct(this.product, this.quantity);
    }
  }
}
