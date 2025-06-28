import { Component } from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
@Component({
  selector: 'app-welcome-section',
  imports: [MatTabGroup, MatTab, MatCard, MatCardTitle, MatCardContent,],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.scss'
})
export class WelcomeSectionComponent {
  herbs = [
    {
      name: 'Chamomile',
      imageUrl: 'https://cld.accentuate.io/558149304501/1660842076638/HerbalLibrary_Gallery_chamomile_2_720x720.jpg?v=1660842076638&options=h_920',
      benefit: 'Promotes better sleep and relaxation.'
    },
    {
      name: 'Peppermint',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkD-BeYdY7rP9LQNaNTC5ZwQ8FWU-1jqSCRA&s',
      benefit: 'Soothes digestion and eases discomfort.'
    },
    {
      name: 'Lemongrass',
      imageUrl: 'https://www.kitchengardenherbs.com/wp-content/uploads/2018/03/Lemon-Grass.jpg',
      benefit: 'Supports detox and boosts immunity.'
    },
    {
      name: 'Sage',
      imageUrl: 'https://i0.wp.com/gathervictoria.com/wp-content/uploads/2016/05/dscf4079.jpg?resize=586%2C782&ssl=1',
      benefit: 'Enhances memory and cognitive function.'

    }
  ];
}
