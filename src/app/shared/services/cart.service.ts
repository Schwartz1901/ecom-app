import { inject, Injectable, signal, WritableSignal } from '@angular/core';

import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {  
  private cart : WritableSignal<Cart> = signal<Cart>({
    userId: 'guest',
    items: [],
  });

  getCart = () => this.cart();
  getCartSignal = () => this.cart;

  addItem(item: CartItem) {
    const current = this.cart();
     const index = current.items.findIndex(i => i.productId === item.productId);

    if (index >= 0) {
      // Update quantity
      current.items[index].quantity += item.quantity;
    } else {
      current.items.push(item);
    }

     this.cart.set({ ...current });
  }
  removeItem(productId: string) {
    const current = this.cart();
    const filtered = current.items.filter(item => item.productId !== productId);
    this.cart.set({...current, items: filtered})
  }

  updateQuantity(productId: string, quantity: number) {
    const current = this.cart();
    const index = current.items.findIndex(i => i.productId === productId);
    if (index >= 0) {
      current.items[index].quantity = quantity;
      this.cart.set({...current});
    }
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

  addFromProduct(product: Product, quantity: number = 1) {
    const item: CartItem = {
      productId:(product.id).toString(),
      productName: product.name,
      price: Number(product.price),
      quantity: quantity,
      imageUrl: product.imageUrl
    };
    this.addItem(item);
}
  constructor() { }
}
