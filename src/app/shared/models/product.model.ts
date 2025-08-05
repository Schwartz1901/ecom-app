export interface Product {
  id?: string;
  categories: string[];
  name: string;
  price: number ;
  discountPrice: number ;
  isDiscount: boolean;
  imageUrl: string;
  imageAlt: string;
  description: string;
}