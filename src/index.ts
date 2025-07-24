import { EventEmitter } from './components/base/events';
import { ShopAPI } from './components/ShopAPI';
import './scss/styles.scss';
import { Cart } from './types/models/cart';
import { Product } from './types/models/product';
import { ProductModel } from './types/models/productModel';
import { OrderModel, IOrderForm } from './types/models/order';
import { API_URL, CDN_URL } from './utils/constants';
import { MainUI } from './types/views/mainUI';
import { Modal } from './components/common/Modal';
import { ProductView } from './components/ProductView';
import { Basket, BasketItem } from './components/Basket';
import { Order, Contacts, Success } from './components/Order';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter()

const api = new ShopAPI(CDN_URL, API_URL)

const productModel = new ProductModel(events)
const cartModel = new Cart()
const orderModel = new OrderModel()

const page = document.body;
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const mainUIView = new MainUI(page, events);
const basket = new Basket(cloneTemplate<HTMLElement>('#basket'), events);
const order = new Order(cloneTemplate<HTMLFormElement>('#order'), events);
const contacts = new Contacts(cloneTemplate<HTMLFormElement>('#contacts'), events);

events.on('items:changed', (data: { catalog: Product[] }) => {
    mainUIView.catalog = data.catalog;
});

events.on('card:select', (data: { card: { id: string } }) => {
    const product = productModel.getProduct(data.card.id);
    if (product) {
        const productElement = cloneTemplate<HTMLElement>('#card-preview');
        const productView = new ProductView(productElement, events);
        modal.render({ content: productView.render(product) });
    }
});

events.on('product:toggle', (data: { product: { id: string } }) => {
    const product = productModel.getProduct(data.product.id);
    if (product) {
        if (cartModel.contains(product)) {
            console.log('Товар уже в корзине');
        } else {
            cartModel.addItem(product);
            events.emit('basket:changed');
        }
    }
    modal.close();
});

events.on('basket:changed', () => {
    mainUIView.counter = cartModel.getCount();
});

events.on('basket:open', () => {
    const basketItems = cartModel.getItems().map((cartItem, index) => {
        const basketItem = new BasketItem(cloneTemplate<HTMLElement>('#card-basket'), events);
        return basketItem.render({
            id: cartItem.product.id.toString(),
            title: cartItem.product.name,
            price: cartItem.product.cost,
            index: index + 1
        });
    });

    basket.items = basketItems;
    basket.selected = cartModel.getItems().map(cartItem => cartItem.product.id.toString());
    basket.total = cartModel.getTotalCost();

    modal.render({
        content: basket.render()
    });
});

events.on('basket:remove', (data: { index: number }) => {
    cartModel.removeItemByIndex(data.index);
    events.emit('basket:changed');
    events.emit('basket:open');
});

events.on('order:open', () => {
    orderModel.setItems(cartModel.getProductsFlat());
    modal.render({
        content: order.render({
            payment: '',
            address: '',
            valid: false,
            errors: []
        })
    });
});

events.on('order:submit', () => {
    modal.render({
        content: contacts.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    });
});

events.on('contacts:submit', () => {
    api.orderProducts(orderModel.getOrder())
        .then((result: { total: number }) => {
            const success = new Success(cloneTemplate<HTMLElement>('#success'), events);
            modal.render({
                content: success.render({
                    total: result.total
                })
            });
            cartModel.clear();
            orderModel.clear();
            events.emit('basket:changed');
        })
        .catch((err: Error) => {
            console.error(err);
        });
});

events.on('order:success', () => {
    modal.close();
});

events.on(/^order\..*:change/, (data: { field: string, value: string }) => {
    const validFields = ['payment', 'address', 'email', 'phone'];
    if (validFields.includes(data.field)) {
        orderModel.setOrderField(data.field as keyof IOrderForm, data.value);
        
        const errors = orderModel.validateOrder();
        const isValid = Object.keys(errors).length === 0;
        
        order.render({
            payment: orderModel.payment,
            address: orderModel.address,
            valid: isValid && !!orderModel.payment && !!orderModel.address,
            errors: Object.values(errors)
        });
    }
});

events.on(/^contacts\..*:change/, (data: { field: string, value: string }) => {
    const validFields = ['payment', 'address', 'email', 'phone'];
    if (validFields.includes(data.field)) {
        orderModel.setOrderField(data.field as keyof IOrderForm, data.value);
        
        const errors = orderModel.validateContacts();
        const isValid = Object.keys(errors).length === 0;
        
        contacts.render({
            email: orderModel.email,
            phone: orderModel.phone,
            valid: isValid && !!orderModel.email && !!orderModel.phone,
            errors: Object.values(errors)
        });
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modal.close();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const activeModals = document.querySelectorAll('.modal_active');
    activeModals.forEach(modal => {
        modal.classList.remove('modal_active');
    });
    
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflowY = '';
});

console.log('Starting to load products from:', API_URL);
api.getProductList()
    .then(products => {
        console.log('Products loaded:', products);
        productModel.items = products
    })
    .catch(err => {
        console.error('Ошибка загрузки товаров: ', err)
    })