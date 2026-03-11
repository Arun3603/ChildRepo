import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  images: Array<{ url: string; title?: string }> = [
    { url: 'assets/gallery/logo.png', title: 'Kalvi Aazhi Logo' },
    { url: 'assets/gallery/poster.png', title: 'Kalvi Aazhi Poster' },
  ];
}
