import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Post } from '../../post.model';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  postIndex: number;
  nextId: number;

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.postIndex = +params.postIndex;
        this.post = this.blogService.getPostById(this.postIndex);
        if(typeof this.post === 'undefined') {
          this.post = this.blogService.getPostById(0);
        }
      }
    );
  }

  nextArticle() {
    var post = this.blogService.getPostById(this.postIndex+1);
    if(typeof post === 'undefined') {
      this.nextId = 0;
    }
    else {
      this.nextId = ++this.postIndex;
    }
    this.router.navigate(['/blog', this.nextId]);
  }

}