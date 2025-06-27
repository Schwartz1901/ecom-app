import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { PageNotFoundComponent } from '../../../shared/page-not-found/page-not-found.component';

@Component({
  selector: 'app-product-detail',
  imports: [PageNotFoundComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  )  {}

product?: Product;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }
}
