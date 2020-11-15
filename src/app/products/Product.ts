import { IProduct } from './IProduct';

export class Product implements IProduct
{
    constructor(
        public Name: string,
        public Description: string,
        public Price: number,
        public Quantity: number,
        public Location: string)
    {
        this.Name = Name;
    }
}