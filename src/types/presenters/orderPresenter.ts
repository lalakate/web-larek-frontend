interface IOrderPresenter {
    onStep1(): void;
    onStep2(): void;
}

export class OrderPresenter implements IOrderPresenter {
    onStep1(): void {}

    onStep2(): void {}
}