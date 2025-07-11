import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-api-tester',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api-tester.component.html',
  styleUrl: './api-tester.component.scss',
})
export class ApiTesterComponent {
  private http = inject(HttpClient);

  // Make it flexible
  @Input() baseUrl: string = 'http://localhost:7035/api/Product/';
  @Input() methods: string[] = ['GET', 'POST', 'PUT', 'DELETE'];

  apiPath = this.baseUrl;
  apiMethod = 'GET';
  apiBody = '';
  apiResult = signal('');

  runApi(event: Event) {
    event.preventDefault();
    const url = this.apiPath;
    let request;

    switch (this.apiMethod) {
      case 'GET':
        request = this.http.get(url);
        break;
      case 'POST':
        request = this.http.post(url, this.tryParse(this.apiBody), this.jsonHeaders());
        break;
      case 'PUT':
        request = this.http.put(url, this.tryParse(this.apiBody), this.jsonHeaders());
        break;
      case 'DELETE':
        request = this.http.delete(url);
        break;
      default:
        this.apiResult.set('❌ Unsupported method');
        return;
    }

    request.subscribe({
      next: res => this.apiResult.set(JSON.stringify(res, null, 2)),
      error: err => this.apiResult.set(`❌ Error: ${err.message}`),
    });
  }

  private tryParse(str: string) {
    try {
      return JSON.parse(str);
    } catch {
      return {};
    }
  }

  private jsonHeaders() {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }
}
