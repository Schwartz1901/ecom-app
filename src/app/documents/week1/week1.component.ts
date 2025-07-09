import { Component } from '@angular/core';
import { ScriptWidgetComponent } from "../components/script-widget/script-widget.component";
import { signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChecklistComponent } from "../components/checklist/checklist.component";
@Component({
  selector: 'app-week1',
  standalone: true,
  imports: [ScriptWidgetComponent, FormsModule, ChecklistComponent],
  templateUrl: './week1.component.html',
  styleUrl: './week1.component.scss'
})
export class Week1Component {
  userProfileCode: string = `// user-profile.ts
  @Component({
    selector: 'user-profile',
    template: \`
      <h1>User profile</h1>
      <p>This is the user profile page</p>
    \`,
  })
  export class UserProfile {
    // Your component code goes here
  }`;
  userProfileCode2: string = `@Component({
    selector: 'user-profile',
    templateUrl: 'user-profile.html',
    styleUrl: 'user-profile.css',
  })
  export class UserProfile {
    // Component behavior is defined in here
  }`
  userProfileCode3: string = `// user-profile.ts
  import {ProfilePhoto} from 'profile-photo.ts';
  @Component({
    selector: 'user-profile',
    imports: [ProfilePhoto],
    template: \`
      <h1>User profile</h1>
      <profile-photo />
      <p>This is the user profile page</p>
    \`,
  })
  export class UserProfile {
    // Component behavior is defined in here
  }`

  count = signal(0);
  doubled = computed(() => this.count() * 2)
  increment() {
    this.count.set(this.count() + 1)
  }
  signalHtmlCode = `<div class="signal-exp">
                <p>This is the signal {{ count() }}</p>
                <button (click)="increment()">Increase</button>
            </div>`
  signalTsCode = `count = signal(0);
  increment() {
    this.count.set(this.count() + 1)
  }`

  computedHtmlCode=`<p>Base value: {{ count() }}</p>
                <p>Doubled: {{ doubled() }}</p>
                <button (click)="increment()">Increase</button>`
  computedTsCode=`count = signal(0);
  doubled = computed(() => this.count() * 2)
  increment() {
    this.count.set(this.count() + 1)
  }`

  sample = '{{message}}'

  //This is for data binding example
  username = 'Angular Developer';
  imageUrl = 'https://th.bing.com/th/id/OIP.4rLk37ghjFvTUwWcczdSpAHaH9?w=175&h=188&c=7&r=0&o=7&pid=1.7&rm=3';

  changeName() {
    this.username = 'Signal Master';
  }
  interpolationHtml = `Hello, {{ username }}!`;
  propertyBindingHtml = `<img [src]="imageUrl" alt="Angular Logo" width="100" />
  //ts code
    imageUrl = 'https://th.bing.com/th/id/OIP.4rLk37ghjFvTUwWcczdSpAHaH9?w=175&h=188&c=7&r=0&o=7&pid=1.7&rm=3';
  `
  eventBindingHtml =`<button (click)="changeName()">Change Name</button>
  //ts code:
  changeName() {
    this.username = 'Signal Master';
  }
  `
  twoWayBindingHtml= `<input [(ngModel)]="username" placeholder="Enter your name" />`
  ///
  /// This is for Eager and Lazy load example
  loadHtml = `import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Eager-loaded route
  { path: 'home', component: HomeComponent },

  // Lazy-loaded route
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule)
  },
];
`
}
