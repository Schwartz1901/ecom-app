import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-product-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './product-layout.component.html',
  styleUrl: './product-layout.component.scss'
})
export class ProductLayoutComponent {

}
