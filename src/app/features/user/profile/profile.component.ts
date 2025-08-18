import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from '../../../components/page-not-found/page-not-found.component';
import { User, UserService } from '../../../shared/services/user.service';

// Adjust these paths to your project layout
import { OrderService } from '../../../shared/services/order.service';
import { OrderDto, OrderItemDto, AddressDto } from '../../../shared/models/order.model';

type AddressFormModel = {
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

// ===== View models used by your HTML =====
interface OrderItem {
  productId: string;
  name?: string;                 // not in DTO; leave undefined or enrich later
  imageUrl: string;
  imageAlt?: string;
  quantity: number;
  price: number;                 // from unitPrice
  discountPrice?: number | null; // not in DTO; keep undefined
  isDiscount?: boolean;          // not in DTO; keep false/undefined
}

interface OrderSummary {
  id?: string;                   // not in DTO
  orderNumber?: string;          // not in DTO
  createdAt: Date;               // from orderDate
  status: string;                // from orderStatus
  subtotal?: number;             // computed from items
  shippingFee?: number;          // not in DTO
  total: number;                 // from DTO
  items: OrderItem[];            // mapped from orderItems
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PageNotFoundComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // DI
  private userService = inject(UserService);
  private ordersService = inject(OrderService);
  private fb = inject(FormBuilder);

  // user block (@if(user) in template)
  user: User | null = null;

  // address form
  addressForm!: FormGroup;

  // order history for the template
  orders: OrderSummary[] = []; // keep non-null to simplify template

  ngOnInit(): void {
    this.buildAddressForm();

    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.patchAddressFromUser(user);
        this.loadOrders(); 
      },
      error: (err) => console.error('Error loading profile:', err),
    });
  }

  // --- orders ---
  private loadOrders() {
    this.ordersService.getHistory().subscribe({
      next: (list: OrderDto[]) => {
        this.orders = list.map(this.mapOrderDtoToView);
        console.log(this.orders)
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
        this.orders = [];
      },
    });
  }

  private mapOrderDtoToView = (dto: OrderDto): OrderSummary => {
    const items: OrderItem[] = (dto.orderItems ?? []).map(this.mapItemDtoToView);
    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

    return {
      id: dto.id,
      createdAt: new Date(dto.orderDate),
      status: dto.orderStatus,
      total: dto.total,
      subtotal,
      items,
    };
  };

  private mapItemDtoToView = (i: OrderItemDto): OrderItem => ({
    productId: String(i.productId),
    imageUrl: i.imageUrl,
    imageAlt: i.imageAlt,
    quantity: i.quantity,
    price: i.unitPrice,
    // name/discount fields aren’t in your DTO; leave undefined unless you enrich
    isDiscount: false,
    discountPrice: undefined,
  });

  // --- address helpers ---
  private buildAddressForm() {
    this.addressForm = this.fb.group({
      recipient: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  private patchAddressFromUser(user: User) {
    const addr: Partial<AddressFormModel> =
      (user as any)?.address ??
      {
        recipient: (user as any)?.fullName || user.username || '',
        street: '',
        city: '',
        province: '',
        postalCode: '',
        country: '',
      };

    this.addressForm.patchValue({
      recipient: addr.recipient ?? '',
      street: addr.street ?? '',
      city: addr.city ?? '',
      province: addr.province ?? '',
      postalCode: addr.postalCode ?? '',
      country: addr.country ?? '',
    });
  }
}
