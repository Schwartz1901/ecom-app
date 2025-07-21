import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../components/footer/footer.component";
import { ChatbotComponent } from "../features/chatbot/chatbot.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent, ChatbotComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isOpen = false;
    toggleChat() {
      this.isOpen = !this.isOpen;
    }
}
