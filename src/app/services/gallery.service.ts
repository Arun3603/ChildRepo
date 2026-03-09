import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GalleryImage {
  filename: string;
  url: string;
  title?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getImages(): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(`${this.apiUrl}/images`);
  }

  uploadImage(file: File, title?: string, description?: string): Observable<{ filename: string; url: string }> {
    const formData = new FormData();
    formData.append('image', file);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    return this.http.post<{ filename: string; url: string }>(`${this.apiUrl}/upload`, formData);
  }
}
