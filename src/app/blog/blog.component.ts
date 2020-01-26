import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  postIndexes: number [] = [1, 4, 5];
  bannerPosts: Post[] = [];
  current;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.postIndexes.forEach(postIndex => {
      this.bannerPosts.push(this.blogService.getPostById(postIndex));      
    });
  }

}
