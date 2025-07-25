import { Component } from './Component';
import { IEvents } from './events';
import { ensureElement } from '../../utils/utils';
import { Product } from '../../types/models/product';

export abstract class CardBase extends Component<Product> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _button?: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
        this._button = container.querySelector<HTMLButtonElement>('.card__button');
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set image(value: string) {
        this.setImage(this._image, value);
    }

    set category(value: string) {
        this.setText(this._category, value);
        this._category.className = `card__category card__category_${this.getCategoryClass(value)}`;
    }

    set price(value: number | null) {
        this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
        this.container.dataset.price = value ? String(value) : '';
        
        if (this._button) {
            this.setDisabled(this._button, value === null);
        }
    }

    set buttonText(value: string) {
        if (this._button) {
            this.setText(this._button, value);
        }
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

    protected getProductData(): Product {
        return {
            id: this.id,
            name: this._title.textContent || '',
            category: this._category.textContent || '',
            cost: this.container.dataset.price ? parseInt(this.container.dataset.price) : null,
            imageURL: this._image.src,
            description: this.getDescription()
        };
    }

    protected getDescription(): string {
        return '';
    }

    render(data: Product): HTMLElement {
        this.id = data.id;
        this.title = data.name;
        this.image = data.imageURL;
        this.category = data.category;
        this.price = data.cost;
        this.setDescription(data.description || '');
        return this.container;
    }

    protected setDescription(value: string): void {
        void value;
    }
}
