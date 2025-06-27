import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  
}
