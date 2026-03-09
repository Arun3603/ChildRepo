import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
      { path: 'events', loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent) },
      { path: 'donation', loadComponent: () => import('./pages/donation/donation.component').then(m => m.DonationComponent) },
      { path: 'trustees', loadComponent: () => import('./pages/trustees/trustees.component').then(m => m.TrusteesComponent) },
      { path: 'news', loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent) },
      { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
    ]
  },
  { path: '**', redirectTo: '' }
];
