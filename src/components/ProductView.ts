import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { Product } from '../types/models/product';
import { CardBase } from './base/CardBase';

export class ProductView extends CardBase {
    protected _description: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this._description = ensureElement<HTMLElement>('.card__text', container);

        if (this._button) {
            this._button.addEventListener('click', (event) => {
                event.preventDefault();
                this.events.emit('product:toggle', { product: this.getProductData() });
            });
        }
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    protected getDescription(): string {
        return this._description.textContent || '';
    }

    protected setDescription(value: string): void {
        this.description = value;
    }

    render(data: Product): HTMLElement {
        const result = super.render(data);
        this.buttonText = 'В корзину';
        return result;
    }
}
