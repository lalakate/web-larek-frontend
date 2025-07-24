import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    render(state: Partial<T> & IFormState) {
        const {valid, errors, ...inputs} = state;
        super.render({valid, errors});
        Object.assign(this, inputs);
        return this.container;
    }
}

export class Order extends Form<{payment: string, address: string}> {
    protected _card: HTMLButtonElement;
    protected _cash: HTMLButtonElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._card = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this._cash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);

        this._card.addEventListener('click', (event) => {
            event.preventDefault();
            this._card.classList.add('button_alt-active');
            this._cash.classList.remove('button_alt-active');
            this.onInputChange('payment', 'card');
        });

        this._cash.addEventListener('click', (event) => {
            event.preventDefault();
            this._cash.classList.add('button_alt-active');
            this._card.classList.remove('button_alt-active');
            this.onInputChange('payment', 'cash');
        });
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}

export class Contacts extends Form<{email: string, phone: string}> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}

export class Success extends Component<{total: number}> {
    protected _close: HTMLElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (this._close) {
            this._close.addEventListener('click', (event) => {
                event.preventDefault();
                events.emit('order:success');
            });
        }
    }

    set total(value: string) {
        this.setText(this._total, `Списано ${value} синапсов`);
    }
}
