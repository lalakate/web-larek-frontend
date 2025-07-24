import { IEvents } from "../../components/base/events";
import { Cart } from "../models/cart";
import { OrderModel } from "../models/order";
import { OrderUI } from "../views/orderUI";

interface IOrderPresenter {
    onStep1(formData: {payment: string, address: string}): void;
    onStep2(formData: {email: string, phone: string}): void;
}

export class OrderPresenter implements IOrderPresenter {
    protected view: OrderUI;
    protected model: OrderModel;
    protected cart: Cart;
    protected events: IEvents;
    protected formErrors: Record<string, string>

    onStep1(formData: {payment: string, address: string}): void {}

    onStep2(formData: {email: string, phone: string}): void {}
}