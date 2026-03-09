import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
	product: Product;
	quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
	private readonly itemsSignal = signal<CartItem[]>([]);

	readonly items = this.itemsSignal.asReadonly();

	addToCart(product: Product, quantity: number = 1): void {
		const current = [...this.itemsSignal()];
		const index = current.findIndex(ci => ci.product.id === product.id);
		if (index > -1) {
			current[index] = { ...current[index], quantity: current[index].quantity + quantity };
		} else {
			current.push({ product, quantity });
		}
		this.itemsSignal.set(current);
	}

	removeFromCart(productId: number): void {
		this.itemsSignal.set(this.itemsSignal().filter(ci => ci.product.id !== productId));
	}

	clear(): void {
		this.itemsSignal.set([]);
	}

	totalQuantity(): number {
		return this.itemsSignal().reduce((sum, ci) => sum + ci.quantity, 0);
	}

	totalAmount(): number {
		return this.itemsSignal().reduce((sum, ci) => sum + ci.quantity * ci.product.price, 0);
	}
} 