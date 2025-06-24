import { Product } from "../models/product";

interface IProductDetailUI {
    showProductDetail(product: Product): void;
}

export class ProductDetailUI implements IProductDetailUI {
    showProductDetail(product: Product): void {}
}