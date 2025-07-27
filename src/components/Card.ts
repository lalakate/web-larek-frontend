import { IEvents } from "./base/events";
import { CardBase } from "./base/CardBase";

export class Card extends CardBase {
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        if (this._button) {
            this._button.addEventListener('click', (event) => {
                event.preventDefault();
                this.events.emit('card:select', { card: { id: this.id } });
            });
        }

        container.addEventListener('click', () => {
            this.events.emit('card:select', { card: { id: this.id } });
        });
    }
}