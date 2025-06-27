import { IEvents } from "../../components/base/events";

enum States {
    first,
    second
};

interface IOrderUI {
    showOrderForm(state: States): void;
}

export class OrderUI implements IOrderUI {
    protected container: HTMLElement;
    protected events: IEvents;
    protected paymentButtons: NodeListOf<HTMLButtonElement>;
    protected addressInput: HTMLInputElement;
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected nextButton: HTMLButtonElement;
    protected errors: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {}

    showOrderForm(state: States): void {}
}