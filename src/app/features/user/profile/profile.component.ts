import { Component, OnInit, WritableSignal} from '@angular/core';
import { inject } from '@angular/core';
import { User, UserService } from '../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageNotFoundComponent } from '../../../components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  imports: [PageNotFoundComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  user!: WritableSignal<User | null>;
  usernameInput? = '';
  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.user = this.userService.getCurrentUser();

    this.usernameInput = this.user()?.username;

  }
 

}
