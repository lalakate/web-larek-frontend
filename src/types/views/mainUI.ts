import { IEvents } from "../../components/base/events";
import { Product } from "../models/product";

interface IMainUI {
    showProducts(products: Product[]): void;
    showCartIcon(count: number): void;
}

export class MainUI implements IMainUI {
    protected container: HTMLElement;
    protected events: IEvents;
    protected gallery: HTMLElement;
    protected cartButton: HTMLElement;
    protected cartCounter: HTMLElement;

    showProducts(products: Product[]): void {}

    showCartIcon(count: number): void {}
}