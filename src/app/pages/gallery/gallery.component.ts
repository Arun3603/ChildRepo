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
    { url: 'assets/gallery/image12.jpeg', title: ' ' },
    { url: 'assets/gallery/image13.jpeg', title: ' ' },
    { url: 'assets/gallery/image14.jpeg', title: ' ' },
    { url: 'assets/gallery/image15.jpeg', title: ' ' },
    { url: 'assets/gallery/image16.jpeg', title: ' ' },
    { url: 'assets/gallery/image17.jpeg', title: ' ' },
    { url: 'assets/gallery/image18.jpeg', title: ' ' },
    { url: 'assets/gallery/image19.jpeg', title: ' ' },
    { url: 'assets/gallery/image20.jpeg', title: ' ' },
    { url: 'assets/gallery/image21.jpeg', title: ' ' },
    { url: 'assets/gallery/image22.jpeg', title: ' ' },
    { url: 'assets/gallery/image23.jpeg', title: ' ' },
    { url: 'assets/gallery/image24.jpeg', title: ' ' },
    { url: 'assets/gallery/image25.jpeg', title: ' ' },
    
  ];

  selectedImage: string | null = null;
  showModal = false;

  openModal(img: { url: string; title?: string }) {
    this.selectedImage = img.url;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedImage = null;
  }
}
