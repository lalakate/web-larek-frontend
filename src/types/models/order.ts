import { Product } from './product';

export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrder extends IOrderForm {
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export class OrderModel {
    payment = '';
    address = '';
    email = '';
    phone = '';
    total = 0;
    items: Product[] = [];

    validateOrder(): Partial<IOrderForm> {
        const errors: Partial<IOrderForm> = {};
        if (!this.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this.payment) {
            errors.payment = 'Необходимо указать способ оплаты';
        }
        return errors;
    }

    validateContacts(): Partial<IOrderForm> {
        const errors: Partial<IOrderForm> = {};
        if (!this.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        return errors;
    }

    setOrderField(field: keyof IOrderForm, value: string) {
        this[field] = value;
    }

    setItems(items: Product[]) {
        this.items = items;
        this.total = items.reduce((total, item) => total + (item.cost || 0), 0);
    }

    getOrder(): IOrder {
        return {
            payment: this.payment,
            address: this.address,
            email: this.email,
            phone: this.phone,
            total: this.total,
            items: this.items.map(item => item.id.toString())
        };
    }

    clear() {
        this.payment = '';
        this.address = '';
        this.email = '';
        this.phone = '';
        this.total = 0;
        this.items = [];
    }
}