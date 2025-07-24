import { IEvents } from "../../components/base/events";
import { Product } from "./product";

export class ProductModel {
    protected _items: Product[] = []
    protected _preview: string | null = null

    constructor(protected events: IEvents) {}

    set items(products: Product[]) {
        this._items = products;
        this.events.emit('items:changed', { catalog: this._items });
    }

    get items(): Product[] {
        return this._items
    }

    set preview(itemId: string | null) {
        if(!itemId) {
            this._preview = null
            return
        }

        const selectedItem = this._items.find(item => item.id === itemId)

        if(selectedItem) {
            this._preview = itemId
            this.events.emit('preview:changed', selectedItem)
        }
    }

    get preview(): string | null {
        return this._preview
    }

    getProduct(id: string): Product | undefined {
        return this.items.find(item => item.id === id)
    }
}