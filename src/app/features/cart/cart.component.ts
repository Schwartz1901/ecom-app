import { Component, inject } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartService } from '../../shared/services/cart.service';
import { CheckoutComponent } from "./checkout/checkout.component";


@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  protected cartService = inject(CartService);

  cart$ = this.cartService.getCartSignal();

  remove(productId: string) {
    this.cartService.removeItem(productId);
  }

  update(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  clear() {
    this.cartService.clearCart();
  }

  getTotal() {
    return this.cartService.getTotalPrice();
  }
  
}
