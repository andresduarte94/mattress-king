export class Product {
    
    constructor(
        public id: number,
        public name: string, 
        public description: string,
        public type: number,
        public sizes: string[], 
        public amazonLink: string,
        public country: string,
        public price: number,
        public discount: number,
        public payments: number,
        public score: number
        ) {}
}