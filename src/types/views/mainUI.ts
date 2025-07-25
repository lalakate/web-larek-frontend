import { IEvents } from "../../components/base/events";
import { Component } from "../../components/base/Component";
import { Gallery } from "../../components/Gallery";
import { ensureElement } from "../../utils/utils";

export class MainUI extends Component<Record<string, never>> {
    protected _counter: HTMLElement
    protected _catalog: HTMLElement
    protected _wrapper: HTMLElement
    protected _cart: HTMLElement
    protected gallery: Gallery

    constructor(container: HTMLElement, protected events: IEvents, gallery: Gallery) {
        super(container)

        this._counter = ensureElement<HTMLElement>('.header__basket-counter')
        this._catalog = ensureElement<HTMLElement>('.gallery')
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper')
        this._cart = ensureElement<HTMLElement>('.header__basket')

        this.gallery = gallery

        this._cart.addEventListener('click', (event) => {
            event.preventDefault();
            this.events.emit('basket:open');
        })
    }

    set counter(value: number) {
        this.setText(this._counter, String(value))
    }

    set cards(items: HTMLElement[]) {
        this.gallery.items = items
    }

    set locked(value: boolean) {
        this.toggleClass(this._wrapper, 'page__wrapper_locked', value)
    }
}