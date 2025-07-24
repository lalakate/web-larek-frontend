import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { Product } from '../types/models/product';

export class ProductView extends Component<Product> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._description = ensureElement<HTMLElement>('.card__text', container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', container);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);

        this._button.addEventListener('click', (event) => {
            event.preventDefault();
            this.events.emit('product:toggle', { product: this.getProductData() });
        });
    }

    private getProductData(): Product {
        return {
            id: this.container.dataset.id || '',
            name: this._title.textContent || '',
            category: this._category.textContent || '',
            cost: this.container.dataset.price ? parseInt(this.container.dataset.price) : null,
            imageURL: this._image.src,
            description: this._description.textContent || ''
        };
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set category(value: string) {
        this.setText(this._category, value);
        this._category.className = `card__category card__category_${this.getCategoryClass(value)}`;
    }

    set price(value: number | null) {
        this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
        this.container.dataset.price = value ? String(value) : '';
        
        if (this._button) {
            if (value === null) {
                this._button.disabled = true;
                this.setText(this._button, 'Нельзя купить');
            } else {
                this._button.disabled = false;
            }
        }
    }

    set buttonText(value: string) {
        this.setText(this._button, value);
    }

    protected getCategoryClass(category: string): string {
        const categoryMap: Record<string, string> = {
            'софт-скил': 'soft',
            'хард-скил': 'hard',
            'другое': 'other',
            'дополнительное': 'additional',
            'кнопка': 'button'
        };
        return categoryMap[category] || 'other';
    }

    render(data: Product): HTMLElement {
        this.container.dataset.id = data.id;
        this.title = data.name;
        this.image = data.imageURL;
        this.description = data.description;
        this.category = data.category;
        this.price = data.cost;
        this.buttonText = 'В корзину';
        
        return this.container;
    }
}
