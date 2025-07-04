# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовые компоненты
>>
>**1. Класс `EventEmitter`**
>>
>>Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.
>>
>>Класс имеет методы `on`, `off`, `emit` — для подписки на событие, отписки от события и уведомления подписчиков о наступлении события соответственно.
>>
>>Дополнительно реализованы методы `onAll` и `offAll` — для подписки на все события и сброса всех подписчиков.
>>
>>Интересным дополнением является метод `trigger`, генерирующий заданное событие с заданными аргументами. Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса `EventEmitter`.
>>
>**2. Класс `Api`**
>>
>>Базовый класс для работы с API. Обеспечивает централизованное управление HTTP-запросами к серверу.
>>
>>**Конструктор:** `constructor(baseUrl: string, options: RequestInit = {})` 
>>- `baseUrl: string` - базовый URL API (например, 'https://api.example.com')
>>- `options: RequestInit` - опции запросов (заголовки, методы и т.д.)
>>
>>**Свойства:**
>>- `readonly baseUrl: string` - базовый URL для всех запросов
>>- `protected options: RequestInit` - общие опции для запросов с заголовками по умолчанию
>>
>>**Методы:**
>>- `protected handleResponse(response: Response): Promise<object>` - обработка ответов от сервера, проверка статуса, возврат JSON или ошибки
>>- `get(uri: string): Promise<object>` - выполнение GET запроса к {baseUrl + uri}
>>- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - выполнение POST/PUT/DELETE запросов с JSON телом
>>
>>**Пример использования:**
>>```typescript
>>const api = new Api('https://api.shop.com', {headers: {'Authorization': 'Bearer token'}});
>>const products = await api.get('/products');
>>const order = await api.post('/orders', {items: [1,2,3], total: 1500});
>>```
>>
## Компоненты модели данных (бизнес-логика)
>>
>**1. Интерфейс `IProduct`**
>>
>>Описывает структуру данных товара в интернет-магазине.
>>
>>**Свойства:**
>>- `id: number` - уникальный идентификатор товара
>>- `name: string` - название товара
>>- `category: string` - категория товара
>>- `cost: number` - стоимость товара
>>- `imageURL: string` - URL изображения товара
>>- `description: string` - описание товара
>>
>**2. Класс `Product`**
>>
>>Реализация модели товара. Содержит данные о товаре и используется для создания объектов товаров.
>>
>>**Конструктор:** `constructor(id: number, name: string, category: string, cost: number, imageURL: string, description: string)`
>>- `id: number` - уникальный идентификатор
>>- `name: string` - название товара
>>- `category: string` - категория
>>- `cost: number` - цена
>>- `imageURL: string` - ссылка на изображение
>>- `description: string` - описание
>>
>>**Свойства:** Все свойства объявлены как публичные в конструкторе и доступны напрямую.
>>
>**3. Интерфейс `ICart`**
>>
>>Описывает функциональность корзины покупок для управления выбранными товарами.
>>
>>**Свойства:**
>>- `totalCost: number` - общая стоимость товаров в корзине
>>
>>**Методы:**
>>- `addItem(product: Product): void` - добавление товара в корзину
>>- `removeItem(product: Product): void` - удаление товара из корзины
>>- `getItems(): Product[]` - получение списка всех товаров в корзине
>>- `contains(product: Product): boolean` - проверка наличия товара в корзине
>>
>**4. Класс `Cart`**
>>
>>Реализация корзины покупок. Управляет списком выбранных товаров, подсчитывает общую стоимость.
>>
>>**Конструктор:** `constructor(totalCost: number = 0)`
>>- `totalCost: number` - начальная общая стоимость корзины (по умолчанию 0)
>>
>>**Свойства:**
>>- `products: Product[]` - массив товаров в корзине
>>- `totalCost: number` - общая стоимость товаров
>>
>>**Методы:**
>>- `addItem(product: Product): void` - добавляет товар в корзину, проверяет на дубликаты, пересчитывает общую стоимость
>>- `removeItem(product: Product): void` - удаляет товар из корзины по ID, пересчитывает общую стоимость
>>- `getItems(): Product[]` - возвращает массив товаров в корзине
>>- `contains(product: Product): boolean` - проверяет наличие товара в корзине по ID, выбрасывает ошибку если корзина пуста
>>- `getTotalCost(): number` - возвращает общую стоимость товаров
>>
>**5. Интерфейс `IOrder`**
>>
>>Описывает структуру данных заказа пользователя.
>>
>>**Свойства:**
>>- `paymentMethod: string` - способ оплаты
>>- `deliveryAddress: string` - адрес доставки
>>- `email: string` - email покупателя
>>- `phoneNumber: string` - номер телефона покупателя
>>
>**6. Класс `Order`**
>>
>>Реализация модели заказа. Содержит информацию о способе оплаты и данных покупателя.
>>
>>**Конструктор:** `constructor(paymentMethod: string, deliveryAddress: string, email: string, phoneNumber: string)`
>>- `paymentMethod: string` - способ оплаты
>>- `deliveryAddress: string` - адрес доставки
>>- `email: string` - email
>>- `phoneNumber: string` - телефон
>>
>>**Свойства:** Все свойства объявлены как публичные в конструкторе и доступны напрямую.
>>
## Компоненты представления
>>
>Элементы интерфейса построены на основе сетки, модальных окон, в качестве значений которых используются DOM-элементы с соответствующими классами.
>>
>**1. Интерфейс `IMainUI`**
>>
>>Описывает функциональность главного интерфейса приложения.
>>
>>**Методы:**
>>- `showProducts(products: Product[]): void` - отображение списка товаров на главной странице
>>- `showCartIcon(count: number): void` - отображение иконки корзины с количеством товаров
>>
>**2. Класс `MainUI`**
>>
>>Реализует основной интерфейс приложения. Отвечает за отображение товаров и элементов навигации.
>>
>>**Конструктор:** `constructor(container: HTMLElement, events: IEvents)`
>>- `container: HTMLElement` - корневой элемент для размещения интерфейса
>>- `events: IEvents` - экземпляр брокера событий для взаимодействия с другими компонентами
>>
>>**Свойства:**
>>- `protected container: HTMLElement` - контейнер главной страницы
>>- `protected events: IEvents` - брокер событий
>>- `protected gallery: HTMLElement` - контейнер для галереи товаров
>>- `protected cartButton: HTMLElement` - кнопка корзины
>>- `protected cartCounter: HTMLElement` - счетчик товаров в корзине
>>
>>**Методы:**
>>- `showProducts(products: Product[]): void` - отображает сетку товаров, создает карточки для каждого товара
>>- `showCartIcon(count: number): void` - отображает иконку корзины с количеством товаров, обновляет счетчик
>>
>**3. Интерфейс `IProductDetailUI`**
>>
>>Описывает функциональность отображения детальной информации о товаре.
>>
>>**Методы:**
>>- `showProductDetail(product: Product): void` - отображение подробной информации о выбранном товаре
>>
>**4. Класс `ProductDetailUI`**
>>
>>Реализует интерфейс детального просмотра товара. Отображает модальное окно с полной информацией о товаре.
>>
>>**Конструктор:** `constructor(container: HTMLElement, events: IEvents)`
>>- `container: HTMLElement` - контейнер для модального окна товара
>>- `events: IEvents` - брокер событий для обработки действий пользователя
>>
>>**Свойства:**
>>- `protected container: HTMLElement` - контейнер модального окна
>>- `protected events: IEvents` - брокер событий
>>- `protected title: HTMLElement` - элемент заголовка товара
>>- `protected image: HTMLImageElement` - изображение товара
>>- `protected description: HTMLElement` - описание товара
>>- `protected price: HTMLElement` - цена товара
>>- `protected category: HTMLElement` - категория товара
>>- `protected addToCartButton: HTMLButtonElement` - кнопка добавления в корзину
>>
>>**Методы:**
>>- `showProductDetail(product: Product): void` - заполняет модальное окно данными товара, устанавливает обработчики событий
>>
>**5. Интерфейс `ICartUI`**
>>
>>Описывает функциональность отображения корзины покупок.
>>
>>**Методы:**
>>- `showCart(): void` - отображение содержимого корзины
>>
>**6. Класс `CartUI`**
>>
>>Реализует интерфейс корзины покупок. Отображает список выбранных товаров и общую стоимость.
>>
>>**Конструктор:** `constructor(container: HTMLElement, events: IEvents)`
>>- `container: HTMLElement` - контейнер для модального окна корзины
>>- `events: IEvents` - брокер событий для обработки действий в корзине
>>
>>**Свойства:**
>>- `protected container: HTMLElement` - контейнер корзины
>>- `protected events: IEvents` - брокер событий
>>- `protected list: HTMLElement` - список товаров в корзине
>>- `protected total: HTMLElement` - элемент общей стоимости
>>- `protected button: HTMLButtonElement` - кнопка оформления заказа
>>
>>**Методы:**
>>- `showCart(items: Product[], total: number): void` - отображает корзину с товарами, обновляет общую стоимость, устанавливает состояние кнопки заказа
>>
>**7. Интерфейс `IOrderUI`**
>>
>>Описывает функциональность отображения форм оформления заказа.
>>
>>**Методы:**
>>- `showOrderForm(state: States): void` - отображение формы заказа в зависимости от этапа оформления
>>
>**8. Класс `OrderUI`**
>>
>>**Назначение:** Реализует интерфейс оформления заказа. Управляет отображением многоэтапной формы заказа.
>>
>>**Конструктор:** `constructor(container: HTMLElement, events: IEvents)`
>>- `container: HTMLElement` - контейнер для формы заказа
>>- `events: IEvents` - брокер событий для обработки форм
>>
>>**Свойства:**
>>- `protected container: HTMLElement` - контейнер формы
>>- `protected events: IEvents` - брокер событий
>>- `protected paymentButtons: NodeListOf<HTMLButtonElement>` - кнопки выбора способа оплаты
>>- `protected addressInput: HTMLInputElement` - поле ввода адреса
>>- `protected emailInput: HTMLInputElement` - поле ввода email
>>- `protected phoneInput: HTMLInputElement` - поле ввода телефона
>>- `protected nextButton: HTMLButtonElement` - кнопка перехода к следующему шагу
>>- `protected errors: HTMLElement` - контейнер для отображения ошибок
>>
>>**Методы:**
>>- `showOrderForm(state: States): void` - отображает соответствующий шаг формы заказа, настраивает валидацию полей, управляет видимостью элементов
>>
>**9. Перечисление `States`**
>>
>>Определяет возможные состояния процесса оформления заказа.
>>
>>**Значения:**
>>- `first` - первый этап оформления заказа
>>- `second` - второй этап оформления заказа
>>
>**10. Интерфейс `IModal`**
>>
>>Описывает функциональность управления модальными окнами.
>>
>>**Методы:**
>>- `show(modal: HTMLElement): void` - показать модальное окно
>>- `hide(modal: HTMLElement): void` - скрыть модальное окно
>>
>**11. Класс `Modal`**
>>
>>Реализует функциональность модальных окон. Управляет отображением и скрытием всплывающих окон.
>>
>>**Конструктор:** `constructor(container: HTMLElement, events: IEvents)`
>>- `container: HTMLElement` - контейнер для модальных окон
>>- `events: IEvents` - брокер событий для обработки закрытия модальных окон
>>
>>**Свойства:**
>>- `protected container: HTMLElement` - основной контейнер модальных окон
>>- `protected events: IEvents` - брокер событий
>>- `protected closeButton: HTMLButtonElement` - кнопка закрытия модального окна
>>- `protected content: HTMLElement` - контейнер для содержимого модального окна
>>
>>**Методы:**
>>- `show(content: HTMLElement): void` - отображает модальное окно с указанным содержимым, добавляет обработчики закрытия по клику вне окна или на кнопку закрытия
>>- `hide(): void` - скрывает модальное окно, удаляет обработчики событий, очищает содержимое
>>
## Компоненты презентера
>>
>**1. Интерфейс `IMainPresenter`**
>>
>>Описывает функциональность главного презентера, который координирует взаимодействие пользователя с основными элементами интерфейса.
>>
>>**Методы:**
>>- `onProductClicked(): void` - обработка клика по товару в каталоге
>>- `onCartClicked(): void` - обработка клика по иконке корзины
>>- `onAddToCart(): void` - обработка добавления товара в корзину
>>- `onRemoveToCart(): void` - обработка удаления товара из корзины
>>
>**2. Класс `MainPresenter`**
>>
>>Реализует основную бизнес-логику взаимодействия с главной страницей. Координирует работу между моделями данных и представлениями.
>>
>>**Конструктор:** `constructor(model: Cart, view: MainUI, events: IEvents)`
>>- `model: Cart` - модель корзины для управления товарами
>>- `view: MainUI` - представление главной страницы
>>- `events: IEvents` - брокер событий для координации компонентов
>>
>>**Свойства:**
>>- `protected model: Cart` - модель корзины
>>- `protected view: MainUI` - представление
>>- `protected events: IEvents` - брокер событий
>>
>>**Методы:**
>>- `onProductClicked(product: Product): void` - обрабатывает клик по товару, генерирует событие для открытия детального просмотра
>>- `onCartClicked(): void` - обрабатывает клик по корзине, генерирует событие для открытия модального окна корзины
>>- `onAddToCart(product: Product): void` - добавляет товар в модель корзины, обновляет представление счетчика
>>- `onRemoveToCart(product: Product): void` - удаляет товар из модели корзины, обновляет интерфейс
>>
>**3. Интерфейс `IProductPresenter`**
>>
>>Описывает функциональность презентера для детального просмотра товара.
>>
>>**Методы:**
>>- `onToCartClicked(): void` - обработка клика по кнопке "Добавить в корзину"
>>- `onToCloseClicked(): void` - обработка клика по кнопке закрытия модального окна
>>
>**4. Класс `ProductPresenter`**
>>
>>Реализует бизнес-логику для работы с детальной информацией о товаре. Управляет модальным окном товара.
>>
>>**Конструктор:** `constructor(view: ProductDetailUI, cart: Cart, events: IEvents)`
>>- `view: ProductDetailUI` - представление детального просмотра товара
>>- `cart: Cart` - модель корзины для добавления товаров
>>- `events: IEvents` - брокер событий для взаимодействия с другими компонентами
>>
>>**Свойства:**
>>- `protected view: ProductDetailUI` - представление товара
>>- `protected cart: Cart` - модель корзины
>>- `protected events: IEvents` - брокер событий
>>- `protected currentProduct: Product` - текущий просматриваемый товар
>>
>>**Методы:**
>>- `onToCartClicked(product: Product): void` - обрабатывает добавление товара в корзину, обновляет модель, генерирует событие обновления корзины
>>- `onToCloseClicked(): void` - обрабатывает закрытие модального окна товара, генерирует событие закрытия модального окна
>>
>**5. Интерфейс `IOrderPresenter`**
>>
>>Описывает функциональность презентера для процесса оформления заказа.
>>
>>**Методы:**
>>- `onStep1(): void` - обработка первого этапа оформления заказа (выбор способа оплаты и адреса)
>>- `onStep2(): void` - обработка второго этапа оформления заказа (ввод контактных данных)
>>
>**6. Класс `OrderPresenter`**
>>
>>Реализует бизнес-логику многоэтапного процесса оформления заказа. Управляет переходами между этапами и валидацией данных.
>>
>>**Конструктор:** `constructor(view: OrderUI, model: Order, cart: Cart, events: IEvents)`
>>- `view: OrderUI` - представление формы заказа
>>- `model: Order` - модель заказа для хранения данных
>>- `cart: Cart` - модель корзины с выбранными товарами
>>- `events: IEvents` - брокер событий для координации процесса заказа
>>
>>**Свойства:**
>>- `protected view: OrderUI` - представление заказа
>>- `protected model: Order` - модель заказа
>>- `protected cart: Cart` - корзина товаров
>>- `protected events: IEvents` - брокер событий
>>- `protected formErrors: Record<string, string>` - объект для хранения ошибок валидации
>>
>>**Методы:**
>>- `onStep1(formData: {payment: string, address: string}): void` - обрабатывает первый этап заказа, валидирует данные оплаты и доставки, сохраняет в модель, переходит к следующему шагу
>>- `onStep2(formData: {email: string, phone: string}): void` - обрабатывает второй этап заказа, валидирует контактные данные, завершает заказ, отправляет данные на сервер через API
>>
## Типы данных API
>>
>**1. Тип `ApiListResponse<Type>`**
>>
>>**Назначение:** Описывает структуру ответа API для списочных данных.
>>
>>**Свойства:**
>>- `total: number` - общее количество элементов
>>- `items: Type[]` - массив элементов указанного типа
>>
>**2. Тип `ApiPostMethods`**
>>
>>**Назначение:** Определяет допустимые HTTP методы для изменения данных.
>>
>>**Значения:** `'POST' | 'PUT' | 'DELETE'` - методы для создания, обновления и удаления данных