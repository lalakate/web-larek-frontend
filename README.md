# Проектная работа "Веб-ларек"

## Стек технологий
- **HTML5** - разметка
- **SCSS** - стилизация с препроцессором
- **TypeScript** - типизированный JavaScript
- **Webpack** - сборка проекта

## Архитектура проекта

Проект построен по паттерну **MVP (Model-View-Presenter)** с использованием **брокера событий** для слабой связанности компонентов:

- **Model** (Модель) - бизнес-логика и данные (`src/types/models/`)
- **View** (Представление) - компоненты интерфейса (`src/components/`, `src/types/views/`)
- **Presenter** (Презентер) - связующий слой (`src/types/presenters/`)
- **Events** (События) - брокер событий для связи компонентов (`src/components/base/events.ts`)

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

### 1. Класс `EventEmitter` 

Реализует паттерн «Наблюдатель» и позволяет организовать слабую связанность между компонентами приложения.

**Интерфейс `IEvents`:**
```typescript
interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

**Основные методы:**
- `on(event, callback)` - подписка на событие
- `emit(event, data)` - генерация события с данными
- `trigger(event, context)` - создание функции-генератора события

### 2. Класс `Api` 

Базовый класс для работы с REST API. Предоставляет методы для выполнения HTTP-запросов.

**Конструктор:** `constructor(baseUrl: string, options: RequestInit = {})`

**Методы:**
- `get(uri: string): Promise<object>` - GET запрос
- `post(uri: string, data: object, method?: ApiPostMethods): Promise<object>` - POST/PUT/DELETE запросы
- `protected handleResponse(response: Response): Promise<object>` - обработка ответов

### 3. Класс `Component<T>` 

Базовый класс для всех компонентов представления. Предоставляет общие методы для работы с DOM.

**Основные методы:**
- `render(data?: Partial<T>): HTMLElement` - рендеринг компонента
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` - управление CSS классами
- `setText(element: HTMLElement, value: unknown)` - установка текста
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - установка изображения

### 4. Класс `ShopAPI` 

Специализированный класс для работы с API интернет-магазина. Наследует функциональность базового `Api`.

**Методы:**
- `getProductList(): Promise<IProduct[]>` - получение списка товаров
- `getProductItem(id: string): Promise<IProduct>` - получение товара по ID
- `orderProducts(order: IOrder): Promise<IOrderResult>` - отправка заказа
## Модели данных (Business Logic Layer)

### 1. Модель товара 

**Интерфейс `IProduct`:**
```typescript
interface IProduct {
    id: string;           
    name: string;         
    category: string;     
    cost: number | null;  
    imageURL: string;     
    description: string; 
} 
```

**Класс `Product`:**
Реализация модели товара с маппингом данных из API.

**Конструктор:** `constructor(id: string, title: string, category: string, price: number | null, imageURL: string, description: string)`

### 2. Модель корзины 

**Интерфейс `ICartItem`:**
```typescript
interface ICartItem {
    product: Product;    
    quantity: number;    
}
```

**Интерфейс `ICart`:**
```typescript
interface ICart {
    addItem(product: Product): void;
    removeItem(product: Product): void;
    removeItemByIndex(index: number): void;
    getItems(): ICartItem[];
    getProductsFlat(): Product[];
    contains(product: Product): boolean;
    getTotalCost(): number;
    getCount(): number;
    clear(): void;
}
```

**Класс `Cart`:**
Управляет товарами в корзине. Ограничение: только один экземпляр каждого товара.

**Основные методы:**
- `addItem(product)` - добавляет товар (проверяет дубликаты)
- `removeItemByIndex(index)` - удаляет товар по индексу
- `getTotalCost()` - подсчитывает общую стоимость
- `contains(product)` - проверяет наличие товара

### 3. Модель заказа 

**Интерфейс `IOrderForm`:**
```typescript
interface IOrderForm {
    payment?: string;    
    address?: string;    
    email?: string;      
    phone?: string;      
}
```

**Класс `OrderModel`:**
Управляет данными заказа и их валидацией.

**Методы:**
- `setOrderField(field, value)` - установка поля заказа
- `validateOrder()` - валидация данных оплаты и адреса
- `validateContacts()` - валидация контактных данных
- `setItems(items)` - установка товаров для заказа

### 4. Модель каталога 

**Класс `ProductModel`:**
Управляет каталогом товаров и уведомлениями об изменениях.

**Методы:**
- `set items(items: Product[])` - установка списка товаров
- `getProduct(id: string): Product` - получение товара по ID
## Компоненты представления (View Layer)

### 1. Модальные окна 

**Класс `Modal`:**
Управляет отображением модальных окон.

**Конструктор:** `constructor(container: HTMLElement, events: IEvents)`

**Методы:**
- `open()` - открытие модального окна
- `close()` - закрытие с восстановлением состояния
- `render(data: {content: HTMLElement})` - рендеринг с содержимым

### 2. Корзина товаров 

**Класс `Basket`:**
Отображает список товаров в корзине с возможностью удаления.

**Класс `BasketItem`:**
Отдельный элемент корзины с номером и кнопкой удаления.

### 3. Карточка товара 

**Класс `Card`:**
Компактная карточка товара для каталога.

**Класс `ProductView`:**
Детальный просмотр товара в модальном окне.

### 4. Форма заказа 

**Класс `Order`:**
Первый этап оформления заказа (способ оплаты и адрес).

**Класс `Contacts`:**
Второй этап оформления заказа (контактные данные).

**Класс `Success`:**
Страница успешного оформления заказа.

### 5. Главный интерфейс 

**Класс `MainUI`:**
Управляет отображением каталога товаров и навигацией.

## Презентеры (Controller Layer)

### 1. Главный презентер 

**Интерфейс `IMainPresenter`:**
Определяет контракт для управления главной страницей.

**Реализация через события:**
- `items:changed` - обновление каталога товаров
- `card:select` - выбор товара для детального просмотра
- `basket:open` - открытие корзины

### 2. Презентер товара 

**Интерфейс `IProductPresenter`:**
Управляет взаимодействием с детальным просмотром товара.

**События:**
- `product:toggle` - добавление/удаление товара из корзины
- `modal:close` - закрытие модального окна товара

### 3. Презентер заказа 

**Интерфейс `IOrderPresenter`:**
Координирует процесс оформления заказа.

**События:**
- `order:open` - начало оформления заказа
- `order.payment:change` - изменение способа оплаты
- `contacts:submit` - отправка заказа

## API Integration

### Endpoints:
- `GET /api/weblarek/product` - получение списка товаров
- `GET /api/weblarek/product/{id}` - получение товара по ID
- `POST /api/weblarek/order` - создание заказа

### Типы данных API:

```typescript
type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};

type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}
```