interface IOrder {
    paymentMethod: string;
    deliveryAddress: string;
    email: string;
    phoneNumber: string;
}

export class Order implements IOrder {
    constructor(public paymentMethod: string, public deliveryAddress: string, public email: string, public phoneNumber: string){}
}