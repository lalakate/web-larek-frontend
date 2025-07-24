import { Component } from './base/Component';
import { IEvents } from './base/events';
import { createElement, ensureElement } from '../utils/utils';

interface IBasketView {
    items: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.button');

        if (this._button) {
            this._button.addEventListener('click', (event) => {
                event.preventDefault();
                events.emit('order:open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set total(total: number) {
        this.setText(this._total, `${total} синапсов`);
    }

    set selected(items: string[]) {
        if (items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }
}

export interface IBasketItem {
    id: string;
    title: string;
    price: number | null;
    index: number;
}

export class BasketItem extends Component<IBasketItem> {
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLElement;
    protected _indexValue = 0;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
        this._button = ensureElement<HTMLElement>('.basket__item-delete', this.container);

        if (this._button) {
            this._button.addEventListener('click', (event) => {
                event.preventDefault();
                this.events.emit('basket:remove', { index: this.index - 1 });
            });
        }
    }

    set index(value: number) {
        this._indexValue = value;
        this.setText(this._index, value);
    }

    get index(): number {
        return this._indexValue;
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: number | null) {
        this.setText(this._price, (value > 0) ? `${value} синапсов` : 'Бесценно');
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }
}
