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
      name: 'Shiba Inu',
      tag: 'House Pet',
      price: '$999',
      imageUrl: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
      imageAlt: 'Photo of a Shiba Inu',
      description: 'A friendly and loyal Shiba Inu, perfect for companionship and family life.'
    },
    {
      id: 3,
      name: 'Cat',
      tag: 'House Pet',
      price: '$199',
      imageUrl: 'https://richardswsmith.files.wordpress.com/2022/03/cat.jpg',
      imageAlt: 'Photo of a cat',
      description: 'A playful and independent cat, ideal for those who love feline friends.'
    },
    {
      id: 4,
      name: 'Hamster',
      tag: 'House Pet',
      price: '$199',
      imageUrl: 'https://4.bp.blogspot.com/-gToWL89PEoQ/UQgxCtBw21I/AAAAAAAAA38/I5ygkzUuvmQ/s1600/Hamster_3.jpg',
      imageAlt: 'Photo of a Hamster',
      description: 'A small and adorable hamster, great for kids and small spaces.'
    },
    {
      id: 5,
      name: 'Cute Tiger',
      tag: 'Big Pet',
      price: '$199',
      imageUrl: 'https://th.bing.com/th/id/R.91988bbe1b940648c343bb36b800b178?rik=0E3McRXEn23%2bJQ&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f60000%2fvelka%2ftiger-1379882063eT4.jpg&ehk=buCY03%2fCQm1EdlK8AwTZwIN8czxHLLrKzCzAJmyF2mg%3d&risl=&pid=ImgRaw&r=0',
      imageAlt: 'Photo of a cute tiger',
      description: 'A majestic tiger, known for its beauty and strength, perfect for wildlife enthusiasts.'
    },
    {
      id: 2,
      name: 'Happy Wolf',
      tag: 'Big Pet',
      price: '$199',
      imageUrl: 'https://1.bp.blogspot.com/--nLyFtnT8J0/Xt32UINdaKI/AAAAAAAAAgg/CDSJNX2SISclgvNGpG5ttYg7sxCajdioACK4BGAsYHg/s4320/wolf-635063.jpg',
      imageAlt: 'Photo of a happy wolf',
      description: 'A friendly wolf, symbolizing freedom and wilderness, ideal for nature lovers.'
    },
  ]

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
