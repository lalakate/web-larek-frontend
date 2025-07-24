import { Product } from "./product"

export interface ICartItem {
    product: Product;
    quantity: number;
}

interface ICart {
    addItem(product: Product): void;
    removeItem(product: Product): void;
    removeItemByIndex(index: number): void;
    getItems(): ICartItem[];
    getProductsFlat(): Product[];
    contains(product: Product): boolean;
    getTotalCost(): number;
    getCount(): number;
    clear(): void;
}

export class Cart implements ICart {
    protected items: ICartItem[] = [];

    addItem(product: Product): void {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (!existingItem) {
            this.items.push({ product, quantity: 1 });
        }
    }

    removeItem(product: Product): void {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                this.removeItemByIndex(this.items.indexOf(existingItem));
            }
        }
    }

    removeItemByIndex(index: number): void {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }

    getItems(): ICartItem[] {
        return this.items;
    }

    getProductsFlat(): Product[] {
        const products: Product[] = [];
        this.items.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                products.push(item.product);
            }
        });
        return products;
    }

    contains(product: Product): boolean {
        return this.items.some(item => item.product.id === product.id);
    }

    getTotalCost(): number {
        return this.items.reduce((total, item) => {
            return total + (item.product.cost || 0) * item.quantity;
        }, 0);
    }

    getCount(): number {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    clear(): void {
        this.items = [];
    }
}