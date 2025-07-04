import { Component, inject, Input } from '@angular/core';
import { CartItem } from '../../../shared/models/cart.model';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!: CartItem;

  private cartService = inject(CartService);
   updateQuantity(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    if (value > 0) {
      this.cartService.updateQuantity(this.item.productId, value);
    }
  }
  removeItem() {
    this.cartService.removeItem(this.item.productId);
  }

  getSubtotal(): number {
    return this.item.price * this.item.quantity;
  }
}
