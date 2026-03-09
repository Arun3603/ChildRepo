import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events = [
    { title: 'Charity Run for Children', date: 'March 15, 2025', location: 'Delhi', desc: 'A 5K run to raise awareness and funds for child education.' },
    { title: 'Back to School Drive', date: 'April 1, 2025', location: 'Multiple Cities', desc: 'Donate school supplies for underprivileged children.' },
    { title: 'Health Camp', date: 'April 20, 2025', location: 'Firozabad, UP', desc: 'Free health check-ups and nutrition awareness for children.' },
    { title: 'Gala Dinner', date: 'May 10, 2025', location: 'New Delhi', desc: 'Annual fundraising gala to support our programmes.' }
  ];
}
