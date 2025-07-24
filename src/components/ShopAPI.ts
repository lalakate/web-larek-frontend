import { Product } from "../types/models/product";
import { IOrder, IOrderResult } from "../types/models/order";
import { Api } from "./base/api";

export class ShopAPI extends Api {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options)
        this.cdn = cdn
    }

    getProductList(): Promise<Product[]> {
        return this.get('/product').then((data: any) => 
        data.items.map((item: any) => new Product(
            item.id,
            item.title, 
            item.category,
            item.price,
            this.cdn + item.image,
            item.description
        )))
    }

    getProductItem(id: string): Promise<Product> {
        return this.get(`/product/${id}`).then((item: any) => new Product(
            item.id,
            item.title,
            item.category,
            item.price,
            this.cdn + item.image,
            item.description
        ))
    }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then((data: any) => data as IOrderResult);
    }
}