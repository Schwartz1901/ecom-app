import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  user = this.userService.getCurrentUser();

  logout() {
    this.userService.logout().subscribe({
      next: () => this.router.navigate(['home']),
      error: err => {}
    })

  }
}
