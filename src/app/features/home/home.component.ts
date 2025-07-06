import { Component } from '@angular/core';


import { HeroComponent } from "./hero/hero.component";
import { WelcomeSectionComponent } from "./welcome-section/welcome-section.component";
import { FeaturedProductsComponent } from "./featured-products/featured-products.component";
import { WhyChooseUsComponent } from "./why-choose-us/why-choose-us.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { NewsletterComponent } from "./newsletter/newsletter.component";


@Component({

  selector: 'app-home',
  imports: [HeroComponent, WelcomeSectionComponent, FeaturedProductsComponent, WhyChooseUsComponent, TestimonialsComponent, BlogsComponent, NewsletterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  
}
