import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RouteInfo {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description?: string;
  sampleBody?: any;
  sampleResponse?: any;
}

@Component({
  selector: 'app-route-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-table.component.html',
  styleUrl: './route-table.component.scss',
})
export class RouteTableComponent {
  @Input() routes: RouteInfo[] = [];

  expanded = signal<{ [path: string]: boolean }>({});

  toggle(path: string) {
    const prev = this.expanded();
    this.expanded.set({ ...prev, [path]: !prev[path] });
  }

  isExpanded(path: string) {
    return this.expanded()[path];
  }
}
