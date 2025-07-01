import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  login() {
    this.router.navigate(['home']);
  }
}
