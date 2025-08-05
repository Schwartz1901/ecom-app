import { inject, Injectable, signal, WritableSignal } from '@angular/core';

import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {  
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7123/cart';
  private cart : WritableSignal<Cart> = signal<Cart>({
    userId: 'guest',
    items: [],
  });

  getCart = () => this.cart();
  getCartSignal = () => this.cart;

  addItem(productId: string, quantity: number = 1): void {
  const payload = { productId, quantity };

  this.http.post<CartItem>(`${this.baseUrl}/items`, payload).subscribe({
    next: (updatedItem) => {
      const current = this.cart();
      const index = current.items.findIndex(i => i.productId === updatedItem.productId);

      if (index >= 0) {
        current.items[index] = updatedItem; // Replace with latest data
      } else {
        current.items.push(updatedItem);
      }

      this.cart.set({ ...current });
    },
    error: (err) => {
      console.error('Failed to add item to cart:', err);
    }
  });
}
  removeItem(productId: string) {
    this.http.delete(`${this.baseUrl}/items/${productId}`).subscribe({
      next: () => {
        const current = this.cart();
        const filtered = current.items.filter(item => item.productId !== productId);
        this.cart.set({ ...current, items: filtered });
      },
      error: err => console.error('Failed to remove item:', err)
    });
  }

  updateQuantity(productId: string, quantity: number) {
  this.http.put(`${this.baseUrl}/items/${productId}`, { quantity }).subscribe({
    next: () => {
      const current = this.cart();
      const index = current.items.findIndex(i => i.productId === productId);
      if (index >= 0) {
        current.items[index].quantity = quantity;
        this.cart.set({ ...current });
      }
    },
    error: err => console.error('Failed to update quantity:', err)
  });
}

  clearCart() {
    const current = this.cart();
    this.cart.set({...current, items: []});
  }
  getItemSubtotal(item: CartItem): number {
    return item.price * item.quantity;
  }
  getTotalPrice(): number {
    return this.cart().items.reduce((total, item) => total + item.price * item.quantity, 0);
  }


}
