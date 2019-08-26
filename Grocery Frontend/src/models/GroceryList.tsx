import { GroceryItem } from "./GroceryItem";

export class GroceryList {
    constructor(
        public id: number,
        public name: string,
        public items?: GroceryItem[]
    ) {}
}