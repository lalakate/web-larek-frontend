import { IEvents } from "../../components/base/events";

interface IModal {
    show(modal: HTMLElement): void;
    hide(modal: HTMLElement): void;
}

export class Modal implements IModal {
    protected container: HTMLElement;
    protected events: IEvents;
    protected closeButton: HTMLButtonElement;
    protected content: HTMLElement;

    show(modal: HTMLElement): void {}

    hide(): void {}
}