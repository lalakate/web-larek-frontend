interface IProduct {
    id: string;
    name: string;
    category: string;
    cost: number | null;
    imageURL: string;
    description: string;
}

export class Product implements IProduct {
    public id: string;
    public name: string;
    public category: string;
    public cost: number | null;
    public imageURL: string;
    public description: string;

    constructor(id: string, title: string, category: string, price: number | null, imageURL: string, description: string) {
        this.id = id;
        this.name = title;
        this.category = category;
        this.cost = price;
        this.imageURL = imageURL;
        this.description = description;
    }
}