import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { BlogService } from './blog.service';

import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  postIndexes: number[] = [0, 1, 2];
  bannerPosts: Post[] = [];
  currentPost: Post;
  showingIndex: number = 0;
  carousel: any;
  nextPost = new Subject();

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.postIndexes.forEach(postIndex => {
      this.bannerPosts.push(this.blogService.getPostById(postIndex));
    })
    this.currentPost = this.bannerPosts.slice(0, 1)[0];
    this.nextPost.subscribe((post: Post) => {
      this.currentPost = post;
    });
  }

  ngAfterViewInit() {

    this.carousel = (<any>$('.carousel')).carousel({
      interval: 5000,
      pause: "hover",
      touch: true
    }).carousel('cycle');

    this.carousel.on('slid.bs.carousel', (e: { direction: string; to: number; }) => {
      this.showingIndex = e.to;
      let currentPost = this.bannerPosts.slice(this.showingIndex, this.showingIndex + 1)[0];
      this.nextPost.next(currentPost);
    })
  }

  next() {
    this.carousel.carousel('next');
  }

  prev() {
    this.carousel.carousel('prev');
  }

  selectPost(index: number) {
    this.carousel.carousel(index);
  }
}
