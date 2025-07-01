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
        catagory: ["Cata1", "Cata2"],
        name: "Herb 1",
        price: "100$",
        discountPrice: "50$",
        isDiscount: true,
        imageUrl: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2E8RAYY/organic-emblem-with-herbs-and-spices-and-title-on-round-background-with-ribbon-vector-illustration-2E8RAYY.jpg",
        imageAlt: "Herb 1",
        description: "lorem ipsum",
      },
      {
        id: 2,
        catagory: ["Cata1"],
        name: "Herb 2",
        price: "100$",
        discountPrice: "50$",
        isDiscount: false,
        imageUrl: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2E8RAYY/organic-emblem-with-herbs-and-spices-and-title-on-round-background-with-ribbon-vector-illustration-2E8RAYY.jpg",
        imageAlt: "Herb 1",
        description: "lorem ipsum",
      },

      {
        id: 3,
        catagory: ["Cata1", "Cata2"],
        name: "Herb 3",
        price: "100$",
        discountPrice: "50$",
        isDiscount: true,
        imageUrl: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2E8RAYY/organic-emblem-with-herbs-and-spices-and-title-on-round-background-with-ribbon-vector-illustration-2E8RAYY.jpg",
        imageAlt: "Herb 3",
        description: "lorem ipsum",
      },
      {
        id: 4,
        catagory: ["Cata1", "Cata2", "Cata3"],
        name: "Herb 4",
        price: "100$",
        discountPrice: "50$",
        isDiscount: true,
        imageUrl: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2E8RAYY/organic-emblem-with-herbs-and-spices-and-title-on-round-background-with-ribbon-vector-illustration-2E8RAYY.jpg",
        imageAlt: "Herb 4",
        description: "lorem ipsum",
      },
      {
        id: 5,
        catagory: ["Cata1", "Cata2", "Cata3"],
        name: "Herb 4",
        price: "100$",
        discountPrice: "50$",
        isDiscount: true,
        imageUrl: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2E8RAYY/organic-emblem-with-herbs-and-spices-and-title-on-round-background-with-ribbon-vector-illustration-2E8RAYY.jpg",
        imageAlt: "Herb 4",
        description: "lorem ipsum",
      },
      {
        id: 6,
        catagory: ["Cata1", "Cata2", "Cata3"],
        name: "Herb 4",
        price: "100$",
        discountPrice: "50$",
        isDiscount: true,
        imageUrl: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2E8RAYY/organic-emblem-with-herbs-and-spices-and-title-on-round-background-with-ribbon-vector-illustration-2E8RAYY.jpg",
        imageAlt: "Herb 4",
        description: "lorem ipsum",
      },
      {
        id: 7,
        catagory: ["Cata1", "Cata2", "Cata3"],
        name: "Herb 4",
        price: "100$",
        discountPrice: "50$",
        isDiscount: true,
        imageUrl: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2E8RAYY/organic-emblem-with-herbs-and-spices-and-title-on-round-background-with-ribbon-vector-illustration-2E8RAYY.jpg",
        imageAlt: "Herb 4",
        description: "lorem ipsum",
      },
      {
        id: 8,
        catagory: ["Cata1", "Cata2", "Cata3"],
        name: "Herb 4",
        price: "100$",
        discountPrice: "50$",
        isDiscount: true,
        imageUrl: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2E8RAYY/organic-emblem-with-herbs-and-spices-and-title-on-round-background-with-ribbon-vector-illustration-2E8RAYY.jpg",
        imageAlt: "Herb 4",
        description: "lorem ipsum",
      },
  ]

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
