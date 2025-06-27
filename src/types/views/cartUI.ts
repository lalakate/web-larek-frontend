import { IEvents } from "../../components/base/events";
import { Product } from "../models/product";

interface ICartUI {
    showCart(items: Product[], total: number): void;
}

export class CartUI implements ICartUI {
    protected container: HTMLElement;
    protected events: IEvents;
    protected list: HTMLElement;
    protected total: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {}

    showCart(items: Product[], total: number): void {}
}