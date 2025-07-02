import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private products: Product[] = [
    {
    id: 1,
    catagory: ['Skincare', 'Organic'],
    name: 'Aloe Vera Moisturizing Gel',
    price: '15.99',
    discountPrice: '12.99',
    isDiscount: true,
    imageUrl: 'https://picsum.photos/id/1011/600/400',
    imageAlt: 'Aloe vera gel tube',
    description: 'Hydrates and soothes skin with 99% aloe vera content.'
  },
  {
    id: 2,
    catagory: ['Tea', 'Relaxation'],
    name: 'Chamomile Herbal Tea',
    price: '9.99',
    discountPrice: '9.99',
    isDiscount: false,
    imageUrl: 'https://picsum.photos/id/1050/600/400',
    imageAlt: 'Chamomile tea in cup',
    description: 'Organic chamomile tea for better sleep and relaxation.'
  },
  {
    id: 3,
    catagory: ['Essential Oils'],
    name: 'Lavender Essential Oil',
    price: '19.99',
    discountPrice: '14.99',
    isDiscount: true,
    imageUrl: 'https://picsum.photos/id/1012/600/400',
    imageAlt: 'Lavender oil bottle',
    description: 'Pure lavender oil for aromatherapy and stress relief.'
  },
  {
    id: 4,
    catagory: ['Supplements'],
    name: 'Turmeric Curcumin Capsules',
    price: '24.99',
    discountPrice: '19.99',
    isDiscount: true,
    imageUrl: 'https://picsum.photos/id/1052/600/400',
    imageAlt: 'Turmeric capsules',
    description: 'Supports joint health with bioavailable turmeric extract.'
  },
  {
    id: 5,
    catagory: ['Body Care'],
    name: 'Herbal Bath Salt',
    price: '14.99',
    discountPrice: '14.99',
    isDiscount: false,
    imageUrl: 'https://picsum.photos/id/1080/600/400',
    imageAlt: 'Jar of herbal bath salt',
    description: 'Soothing bath salts with eucalyptus and lavender blend.'
  },
  {
    id: 6,
    catagory: ['Tea', 'Immunity'],
    name: 'Ginger Lemongrass Tea',
    price: '11.99',
    discountPrice: '9.49',
    isDiscount: true,
    imageUrl: 'https://picsum.photos/id/1084/600/400',
    imageAlt: 'Cup of ginger tea',
    description: 'Stimulates immunity and aids digestion naturally.'
  },
  {
    id: 7,
    catagory: ['Hair Care'],
    name: 'Neem Herbal Shampoo',
    price: '18.99',
    discountPrice: '15.99',
    isDiscount: true,
    imageUrl: 'https://picsum.photos/id/1015/600/400',
    imageAlt: 'Herbal shampoo bottle',
    description: 'Strengthens roots and treats dandruff with neem power.'
  },
  {
    id: 8,
    catagory: ['Aromatherapy'],
    name: 'Eucalyptus Room Spray',
    price: '13.50',
    discountPrice: '13.50',
    isDiscount: false,
    imageUrl: 'https://picsum.photos/id/1016/600/400',
    imageAlt: 'Room spray bottle',
    description: 'Natural eucalyptus mist for air purification and mood boost.'
  },
  {
    id: 9,
    catagory: ['Skincare', 'Anti-aging'],
    name: 'Green Tea Face Serum',
    price: '29.99',
    discountPrice: '22.99',
    isDiscount: true,
    imageUrl: 'https://picsum.photos/id/1025/600/400',
    imageAlt: 'Face serum in glass bottle',
    description: 'Reduces wrinkles and brightens skin with green tea antioxidants.'
  },
  {
    id: 10,
    catagory: ['Wellness'],
    name: 'Herbal Sleep Gummies',
    price: '21.99',
    discountPrice: '21.99',
    isDiscount: false,
    imageUrl: 'https://picsum.photos/id/1022/600/400',
    imageAlt: 'Herbal gummies jar',
    description: 'Promotes restful sleep with melatonin and chamomile.'
  }
  ]

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
