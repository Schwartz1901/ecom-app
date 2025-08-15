import { Injectable, WritableSignal, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: string;                   // Guid as string
  username: string;
  email: string;
  gender: string;
  dateOfBirth?: string;         // nullable Date → string (ISO)
  phoneNumber: string;
  avatarUrl: string;
  quote: string;
  subName: string;
  createdAt: string;            // DateTime as ISO string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7123/user';

  getUserProfile(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    console.log('Fetching user profile with headers:', headers);
    console.log('Token:', token);
    return this.http.get<User>(`${this.baseUrl}/profile`, { headers });
  }

}
