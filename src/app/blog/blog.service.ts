import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
 
@Injectable({
    providedIn: 'root'
})
export class BlogService {
  filterChanged = new Subject<any>();
  private posts: Post[] = [];

  getPosts(filter?) {
    let posts = this.posts.slice();
    if(!filter) {
      return posts;
    }
    
    posts = posts.filter(function (post) {
      return (filter.hasOwnProperty('type')? (post.type == filter.type) : (true)) &&
             (filter.hasOwnProperty('title')? (RegExp(filter.title, 'i').test(post.title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true)) &&
             (filter.hasOwnProperty('content')? (RegExp(filter.content, 'i').test(post.content.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true)) &&
             (filter.hasOwnProperty('author')? (RegExp(filter.author, 'i').test(post.author.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true))
    });

    return posts;
  }

  setPosts(posts: Post[]) {
    this.posts = posts;
  }
}