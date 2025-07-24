export const API_URL = `https://larek-api.nomoreparties.co/api/weblarek`;
export const CDN_URL = `https://larek-api.nomoreparties.co/content/weblarek`;

export const settings = {

};

export const Events = {
    ITEMS_CHANGED: 'items:changed',
    CARD_SELECT: 'card:select', 
    PREVIEW_CHANGED: 'preview:changed',
    BASKET_OPEN: 'basket:open',
    BASKET_CHANGED: 'basket:changed',
    MODAL_OPEN: 'modal:open',
    MODAL_CLOSE: 'modal:close',
    ORDER_OPEN: 'order:open',
    ORDER_SUBMIT: 'order:submit',
    CONTACTS_SUBMIT: 'contacts:submit',
    PAYMENT_SELECT: 'payment:select',
    ORDER_READY: 'order:ready',
    FORM_ERRORS_CHANGE: 'formErrors:change'
} as const;
