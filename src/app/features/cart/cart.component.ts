import { Component } from '@angular/core';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-cart',
  imports: [OrderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

}
