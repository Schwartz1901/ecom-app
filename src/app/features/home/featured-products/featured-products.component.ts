import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';


@Component({
  selector: 'app-featured-products',
  standalone: true,
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  imports: [RouterLink]
})
export class FeaturedProductsComponent {
  private productService = inject(ProductService);
  products = signal(this.productService.getProducts());
}