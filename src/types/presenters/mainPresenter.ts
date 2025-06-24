interface IMainPresenter {
    onProductClicked(): void;
    onCartClicked(): void;
    onAddToCart(): void;
    onRemoveToCart(): void;
}

export class MainPresenter implements IMainPresenter {
    onProductClicked(): void {}

    onCartClicked(): void {}

    onAddToCart(): void {}

    onRemoveToCart(): void {}
}