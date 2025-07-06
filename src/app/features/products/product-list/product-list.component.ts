import { Component, signal } from '@angular/core';
import { ProductCardComponent } from '../../../components/product-card/product-card.component';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, SearchbarComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {

  constructor(private productService: ProductService) {}
  products: Product[] = []
  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.applyFilters();
  }
  categories: string[] = ['Tea', 'Bodycare', 'Supplements', 'Remedies'];
  selectedCategories: Set<string> = new Set();

  sortBy: string = 'default';

  filteredProducts = signal<Product[]>([]);


onFilterChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.checked) {
    this.selectedCategories.add(input.value);
  } else {
    this.selectedCategories.delete(input.value);
  }
  this.applyFilters();
}

onSortChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;

  // Use the value
  console.log('Sort by:', selectedValue);
}

applyFilters() {
  let result = [...this.products];

  if (this.selectedCategories.size > 0) {
    result = result.filter(p =>
      Array.from(this.selectedCategories).some(cat => p.catagory.includes(cat))
    );
  }

  switch (this.sortBy) {
    case 'priceLowHigh':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'priceHighLow':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'nameAZ':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameZA':
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  this.filteredProducts.set(result);
}
}