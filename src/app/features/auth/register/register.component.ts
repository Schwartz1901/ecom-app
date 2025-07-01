import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  register() {
    if(this.email === '' || this.password === '' || this.confirmPassword === '') {
      this.errorMessage = "Empty fields!";
    }
    else if (this.password !== this.confirmPassword) {
      this.errorMessage = "Password mismatch!";
    } else {
      this.userService.register(this.email, this.password).subscribe({
        next: () => this.router.navigate(['home']),
        error: err => this.errorMessage = err.message,
      });
    }

  }
}
