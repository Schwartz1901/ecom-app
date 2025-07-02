import { Component } from '@angular/core';
import { SearchbarComponent } from "./searchbar/searchbar.component";

@Component({
  selector: 'app-sidebar',
  imports: [SearchbarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
