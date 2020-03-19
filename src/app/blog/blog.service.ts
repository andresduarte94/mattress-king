import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { Author } from './author.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  filterPostsChanged = new Subject<any>();
  private posts: Post[] = [];
  private authors: Author[] = [];
  postTitles: string[];

  getPosts(filter?) {
    let posts = this.posts.slice();
    if (!filter) {
      return posts;
    }

    posts = posts.filter(function (post) {
      return (filter.hasOwnProperty('type') ? (post.type == filter.type) : (true)) &&
        (filter.hasOwnProperty('title') ? (RegExp(filter.title, 'i').test(post.title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true)) &&
        (filter.hasOwnProperty('content') ? (RegExp(filter.content, 'i').test(post.content.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true))
    });

    return posts;
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
    this.setPostTitles();
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

  setPostTitles() {
    this.postTitles = this.posts.map((post) => {
      return post.title.replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[¿?]/g, '').toLowerCase();
    });
  }

  getURLTitleById(postId: number) {
    const prettyURLTitle = this.postTitles[postId];
    return prettyURLTitle;
  }

  getPostIndexByTitle(postTitle: string) {
    return this.postTitles.indexOf(postTitle);
  }
}