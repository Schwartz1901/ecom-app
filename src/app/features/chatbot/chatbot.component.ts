import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  sendMessage() {
    if (!this.input.trim()) return;

    const userMsg = this.input;
    this.messages.push({ from: 'user', text: userMsg });
    this.input = '';

    this.askAI(userMsg);
  }

  askAI(prompt: string) {
    const url = 'https://api-inference.huggingface.co/models/google/flan-t5-small';
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_HUGGINGFACE_API_TOKEN',
      'Content-Type': 'application/json'
    });

    const body = { inputs: prompt };

    this.http.post<any>(url, body, { headers }).subscribe({
      next: (res) => {
        const output = res[0]?.generated_text || 'No response';
        this.messages.push({ from: 'bot', text: output });
      },
      error: (err) => {
        this.messages.push({ from: 'bot', text: '❌ Error from AI API' });
        console.error(err);
      }
    });
  }
}