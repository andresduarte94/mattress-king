import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from '../blog.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  //postsChanged: Subscription;
  filter = null;

  //Pagination variables
  pageSize = 6;
  maxPages = 5;
  pageOfPosts: Array<any>;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    //Set post onInit and on filterChanged subject
    this.updatePosts(this.filter);
    /* this.postsChanged = this.blogService.filterChanged.subscribe(
      (filter) => {
        this.updatePosts(filter);
      }
    ) */
  }

  //Update posts based on new filter
   updatePosts(filter) {
    let posts = this.blogService.getPosts(filter);
    this.posts = posts;
  }

/*   ngOnDestroy() {
    this.postsChanged.unsubscribe();
  }  */

  // Update current pagination page of items
  onChangePage(pageOfPosts: Array<any>) {
    this.pageOfPosts = pageOfPosts;
  }
}
