import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../shared/services/cart.service';
@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  private cartService = inject(CartService)
  @Input() product!: Product;

  addToCart(product: Product) {
    this.cartService.addFromProduct(product, 1)
  }
}
