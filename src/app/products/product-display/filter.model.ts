export class Filter {
        
    constructor(
        public name?: string, 
        public description?: string,
        public type?: number,
        public size?: string[ ], 
        public country?: string,
        public minprice?: number,
        public maxprice?: number,
        public discount?: number,
        public payments?: number,
        public minscore?: number
        ) {}
}