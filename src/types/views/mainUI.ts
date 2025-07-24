import { IEvents } from "../../components/base/events";
import { Component } from "../../components/Component";
import { Gallery } from "../../components/Gallery";
import { ensureElement } from "../../utils/utils";
import { Product } from "../models/product";

interface IMainUI {
    showProducts(products: Product[]): void;
    showCartIcon(count: number): void;
}

export class MainUI extends Component<{}> {
    protected _counter: HTMLElement
    protected _catalog: HTMLElement
    protected _wrapper: HTMLElement
    protected _cart: HTMLElement
    protected gallery: Gallery

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container)

        this._counter = ensureElement<HTMLElement>('.header__basket-counter')
        this._catalog = ensureElement<HTMLElement>('.gallery')
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper')
        this._cart = ensureElement<HTMLElement>('.header__basket')

        this.gallery = new Gallery(this._catalog, events)

        this._cart.addEventListener('click', (event) => {
            event.preventDefault();
            this.events.emit('basket:open');
        })
    }

    set counter(value: number) {
        this.setText(this._counter, String(value))
    }

    set catalog(items: Product[]) {
        this.gallery.render({ items })
    }

    set locked(value: boolean) {
        this.toggleClass(this._wrapper, 'page__wrapper_locked', value)
    }
}