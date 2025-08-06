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
    cartPrice: 0,
    cartItems: [],
  });

  getCart = () => this.cart();
  getCartSignal = () => this.cart;
  fetchCartById() {
    this.http.get<Cart>(`${this.baseUrl}`).subscribe({
      next: (cartData) => {
        this.cart.set(cartData);
        console.log('[CartService] Updating cart:', cartData);
        console.log(this.cart());
      },
      error: (err) => console.error(err)
    })
  }


  addItem(productId: string, quantity: number = 1): void {
  const payload = { productId, quantity };

  this.http.post<CartItem>(`${this.baseUrl}/items`, payload).subscribe({
    next: (updatedItem) => {
     
      
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
        const filtered = current.cartItems.filter(cartItems => cartItems.id !== productId);
        this.cart.set({ ...current, cartItems: filtered });
        this.fetchCartById();
      },
      error: err => console.error('Failed to remove item:', err)
    });
  }

  updateQuantity(productId: string, quantity: number) {
  this.http.put(`${this.baseUrl}/items/${productId}`, { quantity }).subscribe({
    next: () => {
      const current = this.cart();
      const index = current.cartItems.findIndex(i => i.id === productId);
      if (index >= 0) {
        current.cartItems[index].quantity = quantity;
        this.cart.set({ ...current });
      }
    },
    error: err => console.error('Failed to update quantity:', err)
  });
}

  clearCart() {
    const current = this.cart();
    this.cart.set({...current, cartItems: []});
  }
  getItemSubtotal(item: CartItem): number {
    return item.price * item.quantity;
  }
  getTotalPrice(): number {
    return this.cart().cartPrice;
  }


}
