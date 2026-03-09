import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
	private readonly products: Product[] = [
		{ id: 1, title: 'Smartphone', description: 'Latest 5G smartphone', price: 12999, imageUrl: 'https://via.placeholder.com/300x220?text=Smartphone', category: 'Electronics' },
		{ id: 2, title: 'Headphones', description: 'Noise cancelling headphones', price: 1499, imageUrl: 'https://via.placeholder.com/300x220?text=Headphones', category: 'Electronics' },
		{ id: 3, title: 'Shoes', description: 'Comfortable running shoes', price: 2299, imageUrl: 'https://via.placeholder.com/300x220?text=Shoes', category: 'Fashion' },
		{ id: 4, title: 'Backpack', description: 'Stylish and spacious', price: 899, imageUrl: 'https://via.placeholder.com/300x220?text=Backpack', category: 'Accessories' },
		{ id: 5, title: 'Wrist Watch', description: 'Water resistant', price: 3499, imageUrl: 'https://via.placeholder.com/300x220?text=Watch', category: 'Accessories' },
		{ id: 6, title: 'Laptop', description: 'Powerful and portable', price: 45999, imageUrl: 'https://via.placeholder.com/300x220?text=Laptop', category: 'Electronics' }
	];

	getAll(): Product[] { return this.products; }
	getById(id: number): Product | undefined { return this.products.find(p => p.id === id); }
} 