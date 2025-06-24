import { Product } from "./product"

interface ICart {
    totalCost: number;

    addItem(product: Product): void;
    removeItem(product: Product): void;
    getItems(): Product[];
    contains(product: Product): boolean;
}

export class Cart implements ICart {
    products: Product[];

    constructor(public totalCost: number) {}

    addItem(product: Product): void {}
    removeItem(product: Product): void {}
    getItems(): Product[] {
        return this.products;    
    }
    contains(product: Product): boolean {
        if(!this.products)
            throw new Error('Cart is empty');

        if(this.products.includes(product))
            return true;

        return false;
    }
}