import { IProduct } from './IProduct';

export class Product implements IProduct
{
    // public id: number;
    // public name: string;
    // public description: string;
    // public quantity: number;
    // public price: number;
    // public location: string;

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public quantity: number,
        public price: number,
        public location: string)
    {
    }
}