interface IProductPresenter {
    onToCartClicked(): void;
    onToCloseClicked(): void;
}

export class ProductPresenter implements IProductPresenter {
    onToCartClicked(): void {}

    onToCloseClicked(): void {}
}