interface IProduct {
    id: number;
    name: string;
    category: string;
    cost: number;
    imageURL: string;
    description: string;
}

export class Product implements IProduct {
    constructor(public id: number, public name: string, public category: string, public cost: number, public imageURL: string, public description: string){}
}