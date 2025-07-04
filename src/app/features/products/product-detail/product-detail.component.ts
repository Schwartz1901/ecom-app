import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { PageNotFoundComponent } from '../../../components/page-not-found/page-not-found.component';

import { CartService } from '../../../shared/services/cart.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  imports: [PageNotFoundComponent, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  product?: Product;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }

  quantity: number = 1;

  increase() {
    if (this.quantity < 99) this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) this.quantity--;
  }
  onQuantityChange() {
    // Prevent manual entry of zero or negative
    if (this.quantity < 1) this.quantity = 1;
    if (this.quantity > 99) this.quantity = 99;
  }
  addToCart() {
    this.cartService.addFromProduct(this.product!, this.quantity);
  }
}
