interface IModal {
    show(modal: HTMLElement): void;
    hide(modal: HTMLElement): void;
}

export class Modal implements IModal {
    private modal: HTMLElement;

    show(modal: HTMLElement): void {}

    hide(modal: HTMLElement): void {}
}