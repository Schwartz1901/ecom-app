import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-script-widget',
  standalone: true,
  imports: [],
  templateUrl: './script-widget.component.html',
  styleUrl: './script-widget.component.scss'
})
export class ScriptWidgetComponent {
  @Input() title?: string;
  @Input() content!: string;
}
