import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckoutData } from '../../../shared/models/checkout.model';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'] // optional: create this file for styling
})
export class CheckoutComponent {
  private orderService = inject(OrderService);
  checkoutData : CheckoutData = {
    name: '',
    street: '',
    ward: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'cod'
  };

  isSubmitted = false;

  submitOrder(form: NgForm): void {
    if (form.invalid) return;

    const checkoutData: CheckoutData = {
      name: this.checkoutData.name,
      street: this.checkoutData.street,
      ward: this.checkoutData.ward,
      city: this.checkoutData.city,
      country: this.checkoutData.country,
      zipCode: this.checkoutData.zipCode,
      paymentMethod: this.checkoutData.paymentMethod || 'cod'
    };

    this.orderService.checkout(checkoutData);

    // Optionally: clear cart, show toast, navigate, etc.
    // this.cartService.clearCart();
    // this.router.navigate(['/order-success']);

    // Reset the form and model
    form.resetForm({
      paymentMethod: 'cod' // set default again
    });

    this.checkoutData = {
      name: '',
      street: '',
      ward: '',
      city: '',
      country: '',
      zipCode: '',
      paymentMethod: 'cod'
    };
  }
}
