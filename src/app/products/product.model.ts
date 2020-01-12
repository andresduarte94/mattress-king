export class Product {
    
    constructor(
        public id: string, 
        public name: string, 
        public description: string,
        public type: number,
        public size: string, 
        public imagePath: string,
        public amazonLink: string,
        public country: string,
        public price: number,
        public discount: number,
        public payments: number,
        public score: number
        ) {}
}