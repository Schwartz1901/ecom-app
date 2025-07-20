import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  imports: [RouterLink]
})
export class FeaturedProductsComponent implements OnInit {
  private productService = inject(ProductService);
  products = signal<Product[] | null>(null);
  currentSlide = 0;

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => this.products.set(products),
      error: (err) => console.error('Failed to load featured products', err)
    });
  }

  prev(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  next(): void {
    const productList = this.products();
    if (productList && this.currentSlide < Math.ceil(productList.length / 4) - 1) {
      this.currentSlide++;
    }
  }
}
