import { Product } from "../types/models/product";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";
import { Component } from "./Component";

export class Card extends Component<Product> {
    protected _title: HTMLElement
    protected _image: HTMLElement
    protected _category: HTMLElement
    protected _price: HTMLElement
    protected _button?: HTMLButtonElement

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container)

        this._title = ensureElement<HTMLElement>('.card__title', container)
        this._image = ensureElement<HTMLElement>('.card__image', container)
        this._category = ensureElement<HTMLElement>('.card__category', container)
        this._price = ensureElement<HTMLElement>('.card__price', container)
        this._button = container.querySelector<HTMLButtonElement>('.card__button')

        if(this._button) {
            this._button.addEventListener('click', (event) => {
                event.preventDefault()
                this.events.emit('card:select', { card: this })
            })
        }

        container.addEventListener('click', () => {
            this.events.emit('card:select', { card: this })
        })
    }

    set id(value: string) {
        this.container.dataset.id = value
    }

    get id(): string {
        return this.container.dataset.id || ''
    }

    set title(value: string) {
        this.setText(this._title, value)
    }

    set image(value: string) {
        this.setImage(this._image, value)
    }

    set category(value: string) {
        this.setText(this._category, value)
        this._category.className = `card__category card__category_${this.getCategoryClass(value)}`;
    }

    set price(value: string | null) {
        this.setText(this._price, value ? `${value} синапсов` : 'Бесценно')

        if(this._button) this._button.disabled = !value
    }

    protected getCategoryClass(category: string): string {
        const categoryMap: Record<string, string> = {
            'софт-скил': 'soft',
            'хард-скил': 'hard',
            'другое': 'other',
            'дополнительное': 'additional',
            'кнопка': 'button'
        }

        return categoryMap[category] || 'other'
    }

    render(data: Product): HTMLElement {
        this.id = data.id
        this.title = data.name
        this.image = data.imageURL
        this.category = data.category
        this.price = data.cost ? String(data.cost) : null
        return this.container
    }
}