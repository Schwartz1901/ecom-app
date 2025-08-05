import { Component, inject } from '@angular/core';

import { LayoutComponent } from "./layout/layout.component";
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecom-app';
  private authService = inject(AuthService);
  private router = inject(Router)

  ngOnInit() {
  const token = this.authService.getToken();
  if (token && this.authService.isTokenExpired(token)) {
    console.warn('Token is expired. Refreshing...');
    this.authService.refreshToken().subscribe({
      next: () => {
        console.info("refresh token successfully")
      },
      error: () => {
        console.warn("Session exprifed, logging out...");
        this.authService.logout(localStorage.getItem("token"));
      }
    })
  }
  
}
}
