import { Component, signal, computed } from '@angular/core';
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
  currentPage = signal(1);
  pageSize = 4;


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

  paginatedProducts = computed(() => {
      const start = (this.currentPage() - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredProducts().slice(start, end);
    });
  totalPageArray = computed(() =>
    Array.from({ length: this.totalPages }, (_, i) => i + 1)
  );
  get totalPages(): number {
    return Math.ceil(this.filteredProducts().length / this.pageSize);
  } 

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
    }
  }
}