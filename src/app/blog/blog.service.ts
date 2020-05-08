import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { Author } from './author.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  carouselPostChanged = new Subject<any>();
  private posts: Post[] = [];
  private authors: Author[] = [];

  getPosts() {
    return this.posts;
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
    this.posts.forEach((post) => {
      post.imageAlt = post.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    })
  }

  getPostByUrl(url: string) {
    return this.posts.slice().find((post: Post) => {
      return post.url === url;
    })
  }

  getPostById(postId: number) {
    return this.posts[postId];
  }

  getAuthors() {
    return this.authors;
  }

  setAuthors(authors: Author[]) {
    this.authors = authors;
  }

  getAuthorById(authorId: number) {
    return this.authors[authorId];
  }
}