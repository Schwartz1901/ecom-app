
export interface CartItem{
    id: string;
    productName: string;
    price: number;
    isDiscount: boolean;
    discountPrice: number;
    quantity: number;
    imageUrl?: string;
}
export interface Cart {
    cartItems: CartItem[],
    cartPrice: number
}