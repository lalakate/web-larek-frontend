enum States {
    first,
    second
};

interface IOrderUI {
    showOrderForm(state: States): void;
}

export class OrderUI implements IOrderUI {
    showOrderForm(state: States): void {}
}