import { Component } from '@angular/core';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  amounts = [500, 1000, 2500, 5000, 10000];
  selectedAmount: number | null = null;

  selectAmount(amount: number) {
    this.selectedAmount = amount;
  }
}
