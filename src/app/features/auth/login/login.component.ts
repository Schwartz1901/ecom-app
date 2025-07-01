import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  email = '';
  password = '';
  errorMessage = '';

  login() {
    if(this.email === '' || this.password === '') {
      this.errorMessage = "Empty email or password!";
    } else {
      this.userService.login(this.email, this.password).subscribe({
        next: () => this.router.navigate(['home']),
        error: err => this.errorMessage = err.message,
      })
    }
    
  }
}
