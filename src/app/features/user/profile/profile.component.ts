import { Component, OnInit, WritableSignal, signal} from '@angular/core';
import { inject } from '@angular/core';
import { User, UserService } from '../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageNotFoundComponent } from '../../../components/page-not-found/page-not-found.component';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [PageNotFoundComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{


  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private fb = inject(FormBuilder)
  user: User | null = null;
  usernameInput? = '';
  
  addressForm!: FormGroup;

  ngOnInit(): void {
    
    // const userId = this.route.snapshot.paramMap.get('userId');
    
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        
        this.user = user;
        console.log('User profile loaded:', this.user);
      },
      error: (err) => {console.error('Error loading profile:', err)}
    });
    this.addressForm = this.fb.group({
      recipient: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }
 

}
