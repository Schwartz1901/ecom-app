// Matches backend DTOs (JSON uses camelCase by default in ASP.NET Core)

export interface AddressDto {
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface OrderItemDto {
  productId: string;   // Guid -> string
  quantity: number;
  imageUrl: string;
  imageAlt: string;
  unitPrice: number;   // double -> number
  total: number;       // per-item total
}

export interface OrderDto {
  id: string;
  orderStatus: string;
  description: string;
  orderDate: string;   // DateTime -> ISO string; parse to Date in the UI if needed
  address: AddressDto;
  orderItems: OrderItemDto[];
  total: number;       // order grand total
}
