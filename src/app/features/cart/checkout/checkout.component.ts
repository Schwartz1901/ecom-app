import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'] // optional: create this file for styling
})
export class CheckoutComponent {
  checkoutData = {
    name: '',
    address: '',
    paymentMethod: 'cod'
  };

  isSubmitted = false;

  submitOrder(form: NgForm): void {
    if (form.invalid) return;

    console.log('✅ Order submitted:', this.checkoutData);
    this.isSubmitted = true;

    // TODO: Replace with service logic to send to backend
    // this.checkoutService.placeOrder(this.checkoutData).subscribe(...)

    // Reset form after submission
    form.resetForm({
      paymentMethod: 'cod' // set default value again
    });
  }
}
