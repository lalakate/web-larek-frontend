import { Component } from "./base/Component";

export class Gallery extends Component<{ items: HTMLElement[]}> {
    constructor(container: HTMLElement) {
        super(container)
    }

    set items(cards: HTMLElement[]) {
        this.container.innerHTML = ''
        cards.forEach(card => {
            this.container.appendChild(card)
        })
    }

    render(data: { items: HTMLElement[] }): HTMLElement {
        this.items = data.items
        return this.container
    }
}