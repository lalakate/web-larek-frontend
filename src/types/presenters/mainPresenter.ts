import { IEvents } from "../../components/base/events";
import { Cart } from "../models/cart";
import { ProductModel } from "../models/productModel";
import { MainUI } from "../views/mainUI";

export class MainPresenter {
    constructor(
        protected model: ProductModel,
        protected cartModel: Cart,
        protected view: MainUI,
        protected events: IEvents
    ) {
        this.init()
    }

    protected init() {
        this.events.on('items:changed', (data: {catalog: any[]}) => {
            this.view.catalog = data.catalog
        })

        this.events.on('cart:changed', () => {
            this.view.counter = this.cartModel.getCount()
        })

        this.events.on('card:select', (data: { card: any }) => {
            this.model.preview = data.card.id
        })

        this.events.on('basket:open', () => {
            this.events.emit('modal:open', { content: 'basket' })
        })
    }
}