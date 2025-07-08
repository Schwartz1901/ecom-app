import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-documents',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  weeks = Array.from({ length: 10 }, (_, i) => i + 1);

}
