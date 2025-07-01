import { Component } from '@angular/core';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {

  constructor(private productService: ProductService) {}
  products: Product[] = []
  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}