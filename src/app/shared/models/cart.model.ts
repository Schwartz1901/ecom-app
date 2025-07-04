
export interface CartItem{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}
export interface Cart {
    userId: string;
    items: CartItem[];
}