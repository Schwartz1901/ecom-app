import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutData } from '../models/checkout.model';
import { Observable } from 'rxjs';
import { OrderDto } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private baseUrl = "https://localhost:7123/order"

  getHistory() : Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.baseUrl}/history`);
  }

  checkout(checkoutData: CheckoutData){
    const payload = {
      recipient : checkoutData.name,
      address : {
          street: checkoutData.street,
          ward: checkoutData.ward,
          city: checkoutData.city,
          country: checkoutData.country,
          zipCode: checkoutData.zipCode
      },
      description: ""
    }
    console.log(payload);
    this.http.post(`${this.baseUrl}/checkout`, payload).subscribe({
      next: (response) => {
        console.log("Order placed successfully", response);
        // Optionally show success message or navigate
      },
      error: (err) => {
        console.error("Order failed", err);
        // Optionally show error to user
      }
    })
  }

}
