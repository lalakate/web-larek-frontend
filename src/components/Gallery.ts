import { Product } from "../types/models/product";
import { IEvents } from "./base/events";
import { Card } from "./Card";
import { Component } from "./Component";

export class Gallery extends Component<{ items: Product[]}> {
    protected cardTemplate: HTMLTemplateElement

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container)
        this.cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement
    }

    render(data: { items: Product[] }): HTMLElement {
        this.container.innerHTML = ''

        data.items.forEach(item => {
            const cardElement = this.cardTemplate.content.cloneNode(true) as DocumentFragment
            const cardContainer = cardElement.querySelector('.card') as HTMLElement
            const card = new Card(cardContainer, this.events)
            this.container.appendChild(card.render(item))
        })

        return this.container
    }
}