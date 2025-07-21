import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  http = inject(HttpClient);

  input: string = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];
  isLoading = false;

  sendMessage() {
    const trimmed = this.input.trim();
    if (!trimmed) return;

    this.messages.push({ from: 'user', text: trimmed });
    this.input = '';
    this.askAI(trimmed);
  }

  askAI(prompt: string) {
    this.isLoading = true;

    const url = 'https://localhost:7040/api/chatbot/ask'; 
    const body = { prompt };

    this.http.post<{ response: string }>(url, body).subscribe({
      next: (res) => {
        this.messages.push({ from: 'bot', text: res.response });
        this.isLoading = false;
      },
      error: (err) => {
        this.messages.push({ from: 'bot', text: 'Error from AI API' });
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
