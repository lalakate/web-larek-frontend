import { IOrder, IOrderResult } from "../types/models/order";
import { Api } from "./base/api";

interface IProductData {
    id: string;
    title: string;
    category: string;
    price: number | null;
    image: string;
    description: string;
}

interface IProductListResponse {
    items: IProductData[];
}

export class ShopAPI extends Api {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options)
        this.cdn = cdn
    }

    getProductList(): Promise<IProductData[]> {
        return this.get('/product').then((data: IProductListResponse) => 
            data.items.map((item: IProductData) => ({
                id: item.id,
                title: item.title,
                category: item.category,
                price: item.price,
                image: this.cdn + item.image,
                description: item.description
            }))
        );
    }

    getProductItem(id: string): Promise<IProductData> {
        return this.get(`/product/${id}`).then((item: IProductData) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            price: item.price,
            image: this.cdn + item.image,
            description: item.description
        }));
    }

    orderProducts(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then((data: IOrderResult) => data);
    }
}