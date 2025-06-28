import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeroComponent } from "./hero/hero.component";
import { WelcomeSectionComponent } from "./welcome-section/welcome-section.component";

@Component({

  selector: 'app-home',
  imports: [HeroComponent, WelcomeSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  log() {
  console.log('Button clicked');
  }
  
}
