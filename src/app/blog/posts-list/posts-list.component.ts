import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  // Posts variables
  posts: Post[] = [];
  filter = null;
  //Pagination variables
  pageSize = 6;
  maxPages = 5;
  pageOfPosts: Array<any>;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    //Set posts
    this.posts = this.blogService.getPosts();
  }

  // Update current pagination page of items
  onChangePage(pageOfPosts: Array<any>) {
    this.pageOfPosts = pageOfPosts;
  }
}