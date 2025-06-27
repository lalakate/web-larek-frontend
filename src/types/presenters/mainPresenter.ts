import { IEvents } from "../../components/base/events";
import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { MainUI } from "../views/mainUI";

interface IMainPresenter {
    onProductClicked(product: Product): void;
    onCartClicked(): void;
    onAddToCart(product: Product): void;
    onRemoveToCart(product: Product): void;
}

export class MainPresenter implements IMainPresenter {
    protected model: Cart;
    protected view: MainUI;
    protected events: IEvents;

    constructor(model: Cart, view: MainUI, events: IEvents) {}

    onProductClicked(product: Product): void {}

    onCartClicked(): void {}

    onAddToCart(product: Product): void {}

    onRemoveToCart(product: Product): void {}
}