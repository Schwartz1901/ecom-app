import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Product } from '../models/product.model';
import { signal } from '@angular/core';

export interface Cart{
  userId: string;
  productList: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {  
  private userService = inject(UserService);
  private currentUser = this.userService.getCurrentUser();
  
  private cart = signal<Cart>({

    userId: this.currentUser()?.userId ?? 'guest',
    productList: [],
  })

  

  getCart(userId: string) {
    const userIdCart: Cart = {
      userId: '',
      productList: [],
    }
  }
  setCart(userId: string, product: Product) {
    this.cart().productList.push(product);
  }
  constructor() { }
}
