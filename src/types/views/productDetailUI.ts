import { IEvents } from "../../components/base/events";
import { Product } from "../models/product";

interface IProductDetailUI {
    showProductDetail(product: Product): void;
}

export class ProductDetailUI implements IProductDetailUI {
    protected container: HTMLElement;
    protected events: IEvents;
    protected title: HTMLElement;
    protected image: HTMLImageElement;
    protected description: HTMLElement;
    protected price: HTMLElement;
    protected category: HTMLElement;
    protected addToCartButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {}

    showProductDetail(product: Product): void {}
}