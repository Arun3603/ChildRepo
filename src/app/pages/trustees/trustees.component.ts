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
    { name: 'M. THANGARAJ', role: 'Secretary', bio: 'Educationist & Social Worker.' },
    { name: 'J. STEEPHEN RINOCH', role: 'Joint Secretary', bio: 'Educationist & Social Worker.' },
    { name: 'M. KARTHIK', role: 'Executive Trustee', bio: 'Educationist & Social Worker.' },
    { name: 'M. ARCHANA', role: 'President', bio: 'Educationist & Social Worker.' },
    { name: 'G. SOMASUNDARAM', role: 'Treasurer', bio: 'Educationist & Social Worker.' },
    { name: 'VS. SENTHIL KUMAR', role: 'Trustee', bio: 'Businessman & Social Worker.' }
  ];
}
