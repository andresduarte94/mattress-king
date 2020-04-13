
export class Post {
    constructor(
        public id: number,
        public index: number,  
        public title: string, 
        public url: string,
        public type: number, 
        public authorId: number,
        public imagePath: string,
        public date: number,
        public duration: number,
        public summary: string,
        public imageAlt?: string
        ){}
}