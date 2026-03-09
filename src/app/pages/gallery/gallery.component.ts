import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService, GalleryImage } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  images: GalleryImage[] = [];
  loading = true;
  uploading = false;
  uploadError = '';
  uploadSuccess = false;
  title = '';
  description = '';
  selectedFile: File | null = null;

  constructor(
    private galleryService: GalleryService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadImages();
    } else {
      this.loading = false;
    }
  }

  loadImages() {
    this.loading = true;
    this.galleryService.getImages().subscribe({
      next: (images) => {
        this.images = images;
        this.loading = false;
      },
      error: () => {
        this.images = [];
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && /^image\/(jpeg|png|gif|webp)$/.test(file.type)) {
      this.selectedFile = file;
      this.uploadError = '';
    } else if (file) {
      this.uploadError = 'Please select a valid image (JPEG, PNG, GIF, or WebP).';
      this.selectedFile = null;
    }
  }

  uploadImage() {
    if (!this.selectedFile) {
      this.uploadError = 'Please select an image first.';
      return;
    }

    this.uploading = true;
    this.uploadError = '';
    this.uploadSuccess = false;

    this.galleryService.uploadImage(this.selectedFile, this.title || undefined, this.description || undefined).subscribe({
      next: () => {
        this.uploadSuccess = true;
        this.selectedFile = null;
        this.title = '';
        this.description = '';
        this.uploading = false;
        this.loadImages();
      },
      error: (err) => {
        this.uploadError = err.error?.message || 'Upload failed. Make sure the upload server is running.';
        this.uploading = false;
      }
    });
  }

  clearUpload() {
    this.selectedFile = null;
    this.title = '';
    this.description = '';
    this.uploadError = '';
    this.uploadSuccess = false;
  }
}
