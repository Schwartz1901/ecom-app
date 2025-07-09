import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.scss',
})
export class ChecklistComponent {
   @Input() storageKey: string = 'default-checklist';
  tasks = signal<Task[]>([]);

  ngOnInit() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.tasks.set(JSON.parse(saved));
    }
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks()));
  }

  toggle(index: number) {
    const updated = [...this.tasks()];
    updated[index].done = !updated[index].done;
    this.tasks.set(updated);
    this.save();
  }

  updateText(index: number, newText: string) {
    const updated = [...this.tasks()];
    updated[index].text = newText;
    this.tasks.set(updated);
    this.save();
  }

  addTask() {
    const updated = [...this.tasks(), { text: '', done: false }];
    this.tasks.set(updated);
    this.save();
  }

  remove(index: number) {
    const updated = [...this.tasks()];
    updated.splice(index, 1);
    this.tasks.set(updated);
    this.save();
  }
}
