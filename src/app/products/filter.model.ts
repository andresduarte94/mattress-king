export class Filter {
        
    constructor(
        public name?: string, 
        public description?: string,
        public type?: number,
        public sizes?: string[ ], 
        public country?: string,
        public minprice?: number,
        public maxprice?: number,
        public mindiscount?: number,
        public payments?: number,
        public minscore?: number
        ) {}
}