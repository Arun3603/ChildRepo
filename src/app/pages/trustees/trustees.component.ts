import { Component } from '@angular/core';

@Component({
  selector: 'app-trustees',
  standalone: true,
  imports: [],
  templateUrl: './trustees.component.html',
  styleUrl: './trustees.component.css'
})
export class TrusteesComponent {
  trustees = [
    { name: 'Dr. Rajesh Kumar', role: 'Chairperson', bio: 'Over 20 years of experience in child rights advocacy.' },
    { name: 'Ms. Priya Sharma', role: 'Secretary', bio: 'Expert in education and community development.' },
    { name: 'Mr. Amit Singh', role: 'Treasurer', bio: 'Finance and governance specialist.' },
    { name: 'Dr. Sunita Patel', role: 'Trustee', bio: 'Public health and nutrition advocate.' }
  ];
}
