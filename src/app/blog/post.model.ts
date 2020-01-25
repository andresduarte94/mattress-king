export class Post {
    constructor(
        public id: string, 
        public title: string, 
        public content: string, 
        public type: number, 
        public authorId: number,
        public imagePath: string,
        public date: number,
        public duration: number
        ){}
}