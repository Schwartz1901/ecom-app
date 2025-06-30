import { Component } from '@angular/core';
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-layout',
  imports: [SearchbarComponent, RouterOutlet],
  templateUrl: './product-layout.component.html',
  styleUrl: './product-layout.component.scss'
})
export class ProductLayoutComponent {

}
