import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  private http = inject(HttpClient);

  fileName = '';
  file: File | null = null;

  uploading = signal(false);
  progress = signal(0);
  error = signal<string | null>(null);
  imageUrl = signal<string | null>(null);

  /** Emits the final image URL returned by backend */
  @Output() uploaded = new EventEmitter<string>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    if (!file) return;

    // Optional: validate type/size
    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.error.set('Only PNG, JPG or WEBP allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.error.set('Max 5 MB.');
      return;
    }

    this.file = file;
    this.fileName = file.name;
    this.error.set(null);

    // allow re-selecting the same file
    input.value = '';
  }

  upload() {
    if (!this.file) return;

    const formData = new FormData();
    // IMPORTANT: the key must match your backend parameter name (IFormFile file)
    formData.append('file', this.file);

    this.uploading.set(true);
    this.progress.set(0);
    this.error.set(null);

    this.http.post<{ imageUrl: string }>(
      'https://localhost:7001/api/Product/image',            // <-- change to your real endpoint if needed
      formData,
      { observe: 'events', reportProgress: true }
    ).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const pct = Math.round((event.loaded / event.total) * 100);
          this.progress.set(pct);
        } else if (event.type === HttpEventType.Response) {
          const url = event.body?.imageUrl as string;
          if (url) {
            this.imageUrl.set(url);
            this.uploaded.emit(url);
          }
          this.uploading.set(false);
        }
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Upload failed.');
        this.uploading.set(false);
      }
    });
  }
}
