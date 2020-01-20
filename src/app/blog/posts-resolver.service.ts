import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { BlogService } from './blog.service';
import { Post } from './post.model';


@Injectable({ providedIn: 'root' })
export class PostsResolverService implements Resolve<Post[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private blogService: BlogService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const posts = this.blogService.getPosts();

    if (posts.length === 0) {
      return this.dataStorageService.fetchPosts();
    } else {
      return posts;
    }
  }
}