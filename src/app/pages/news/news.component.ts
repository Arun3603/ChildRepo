import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  news = [
    { title: 'New Education Centre Opens in Firozabad', date: 'Feb 15, 2025', excerpt: 'Our latest initiative brings quality education to 200+ children in the region.' },
    { title: 'Partnership with Local NGOs Strengthened', date: 'Feb 8, 2025', excerpt: 'Collaborative efforts to expand reach and impact across Uttar Pradesh.' },
    { title: 'Health Camp Reaches 500 Families', date: 'Jan 28, 2025', excerpt: 'Free health check-ups and nutrition awareness programme completed successfully.' },
    { title: 'Annual Report 2024 Released', date: 'Jan 10, 2025', excerpt: 'Review our achievements and impact over the past year.' }
  ];
}
