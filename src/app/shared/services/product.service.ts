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
    catagory: ['Bodycare'],
    name: 'Aloe Vera Moisturizing Gel',
    price: '15.99',
    discountPrice: '12.99',
    isDiscount: true,
    imageUrl: 'https://m.media-amazon.com/images/I/61fHsZ2haiL.jpg',
    imageAlt: 'Aloe vera gel tube',
    description: 'Hydrates and soothes skin with 99% aloe vera content.'
  },
  {
    id: 2,
    catagory: ['Tea'],
    name: 'Chamomile Herbal Tea',
    price: '9.99',
    discountPrice: '9.99',
    isDiscount: false,
    imageUrl: 'https://www.stashtea.com/cdn/shop/files/US_-_Organic_Chamomile.png?v=1721681664',
    imageAlt: 'Chamomile tea in cup',
    description: 'Organic chamomile tea for better sleep and relaxation.'
  },
  {
    id: 3,
    catagory: ['Remedies'],
    name: 'Lavender Essential Oil',
    price: '19.99',
    discountPrice: '14.99',
    isDiscount: true,
    imageUrl: 'https://images.surferseo.art/a361af3b-ce8e-4a50-95eb-d1851c3ae5d2.jpeg',
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
    imageUrl: 'https://m.media-amazon.com/images/I/71dSE060CEL.jpg',
    imageAlt: 'Turmeric capsules',
    description: 'Supports joint health with bioavailable turmeric extract.'
  },
  {
    id: 5,
    catagory: ['Bodycare'],
    name: 'Herbal Bath Salt',
    price: '14.99',
    discountPrice: '14.99',
    isDiscount: false,
    imageUrl: 'https://homesteadandchill.com/wp-content/uploads/2022/12/diy-bath-salts-recipe-natural-herbal-homemade-feature-homestead.jpg',
    imageAlt: 'Jar of herbal bath salt',
    description: 'Soothing bath salts with eucalyptus and lavender blend.'
  },
  {
    id: 6,
    catagory: ['Tea'],
    name: 'Ginger Lemongrass Tea',
    price: '11.99',
    discountPrice: '9.49',
    isDiscount: true,
    imageUrl: 'https://birchalltea.co.uk/wp-content/uploads/2018/06/Birchall_Lemongrass_Ginger-15_Prism_Tea_Bags-Hero.jpg',
    imageAlt: 'Cup of ginger tea',
    description: 'Stimulates immunity and aids digestion naturally.'
  },
  {
    id: 7,
    catagory: ['Bodycare'],
    name: 'Neem Herbal Shampoo',
    price: '18.99',
    discountPrice: '15.99',
    isDiscount: true,
    imageUrl: 'https://www.khadinatural.com/cdn/shop/files/Artboard1copy_2238c3cb-8d1a-4158-96a2-97118dbf9ff1.jpg?v=1742798551',
    imageAlt: 'Herbal shampoo bottle',
    description: 'Strengthens roots and treats dandruff with neem power.'
  },
  {
    id: 8,
    catagory: ['Bodycare, Remedies'],
    name: 'Eucalyptus Room Spray',
    price: '13.50',
    discountPrice: '13.50',
    isDiscount: false,
    imageUrl: 'https://www.bathandbodyworks.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master-catalog/default/dwcdd8128b/hires/028008220.jpg',
    imageAlt: 'Room spray bottle',
    description: 'Natural eucalyptus mist for air purification and mood boost.'
  },
  {
    id: 9,
    catagory: ['Skincare'],
    name: 'Green Tea Face Serum',
    price: '29.99',
    discountPrice: '22.99',
    isDiscount: true,
    imageUrl: 'https://ellixee.com/cdn/shop/files/Green-Tea-Face-Serum.jpg?v=1702268797',
    imageAlt: 'Face serum in glass bottle',
    description: 'Reduces wrinkles and brightens skin with green tea antioxidants.'
  },
  {
    id: 10,
    catagory: ['Supplements'],
    name: 'Herbal Sleep Gummies',
    price: '21.99',
    discountPrice: '21.99',
    isDiscount: false,
    imageUrl: 'https://m.media-amazon.com/images/I/61ECtitv9ZL._UF1000,1000_QL80_.jpg',
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
