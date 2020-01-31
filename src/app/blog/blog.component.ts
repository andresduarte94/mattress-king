import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { BlogService } from './blog.service';
import 'bootstrap';
import 'popper.js';
import * as $ from 'jquery';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  postIndexes: number [] = [1, 4, 5];
  bannerPosts: Post[] = [];
  currentPost: Post;
  i: number = 0;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.postIndexes.forEach(postIndex => {
      this.bannerPosts.push(this.blogService.getPostById(postIndex));      
    });
  }

  ngAfterViewInit() {
    (<any>$('.carousel')).carousel({
      interval: 5000
    });

    $('#myCarousel').on('slide.bs.carousel', (e) => {
      if(e.direction == 'right') {
        this.i++;
      }
      if(e.direction == 'left') {
        this.i--;
      }

      this.currentPost = this.bannerPosts[this.i];
    } )
  }

}
