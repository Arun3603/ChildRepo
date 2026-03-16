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
    // { url: 'assets/gallery/logo.png', title: 'Kalvi Aazhi Logo' },
    // { url: 'assets/gallery/poster.png', title: 'Kalvi Aazhi Poster' },
    { url: 'assets/gallery/image1.jpeg', title: ' ' },
    { url: 'assets/gallery/image2.jpeg', title: ' ' },
    { url: 'assets/gallery/image3.jpeg', title: ' ' },
    { url: 'assets/gallery/image4.jpeg', title: ' ' },
    { url: 'assets/gallery/image5.jpeg', title: ' ' },
    { url: 'assets/gallery/image6.jpeg', title: ' ' },
    { url: 'assets/gallery/image7.jpeg', title: ' ' },
    { url: 'assets/gallery/image8.jpeg', title: ' ' },
    { url: 'assets/gallery/image9.jpeg', title: ' ' },
    { url: 'assets/gallery/image10.jpeg', title: ' ' },
    { url: 'assets/gallery/image11.jpeg', title: ' ' },
    
  ];
}
