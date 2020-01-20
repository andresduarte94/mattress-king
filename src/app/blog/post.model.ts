export class Post {
    constructor(
        public id: string, 
        public title: string, 
        public content: string, 
        public type: number, 
        public author: string,
        public imagePath: string
        ){}
}