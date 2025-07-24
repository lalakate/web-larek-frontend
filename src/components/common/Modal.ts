import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;
    protected _scrollPosition = 0;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._closeButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.close();
        });
        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                event.preventDefault();
                this.close();
            }
        });
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    private handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.close();
        }
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this._scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        this.container.classList.add('modal_active');
        
        document.body.style.position = 'fixed';
        document.body.style.top = `-${this._scrollPosition}px`;
        document.body.style.width = '100%';
        document.body.style.overflowY = 'hidden';
        
        document.addEventListener('keydown', this.handleEscKey);
        
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        
        document.removeEventListener('keydown', this.handleEscKey);
        
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        
        window.scrollTo(0, this._scrollPosition);
        
        this.content = document.createElement('div');
        this.events.emit('modal:close');
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}
