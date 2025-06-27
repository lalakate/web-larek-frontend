import { IEvents } from "../../components/base/events";
import { Cart } from "../models/cart";
import { Product } from "../models/product";
import { ProductDetailUI } from "../views/productDetailUI";

interface IProductPresenter {
    onToCartClicked(product: Product): void;
    onToCloseClicked(): void;
}

export class ProductPresenter implements IProductPresenter {
    protected view: ProductDetailUI;
    protected cart: Cart;
    protected events: IEvents;
    protected currentProduct: Product;

    constructor(view: ProductDetailUI, cart: Cart, events: IEvents) {}

    onToCartClicked(product: Product): void {}

    onToCloseClicked(): void {}
}