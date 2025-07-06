import { Component } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  imports: [],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {
  subscribe(event: Event) {
    event.preventDefault();
    alert('Thank you for subscribing!');
  }
}
