import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { BlogService } from './blog.service';
import { Subscription } from 'rxjs';
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']

})
export class BlogComponent implements OnInit {
  // Global variables
  componentWords: any;
  updateLanguageSub: Subscription;
  // Posts variables
  posts: Post[];
  currentPost: Post;
  currentPostSubscription: Subscription;

  constructor(private globalService: GlobalService, private blogService: BlogService) { }

  ngOnInit() {
    // Global variables initialization
    this.componentWords = this.globalService.getTranslationLanguage()['blog'];

    this.updateLanguageSub = this.globalService.updateLanguage.subscribe((translationWords: any) => {
      this.componentWords = translationWords['blog'];
    });

    this.posts = this.blogService.getPosts();
    this.currentPost = this.posts[0];
    this.currentPostSubscription = this.blogService.carouselPostChanged.subscribe((index: number) => {
      this.currentPost = this.posts[index];
    })
  }

  ngOnDestroy() {
    if (this.currentPostSubscription) {
      this.currentPostSubscription.unsubscribe();
    }
    if (this.updateLanguageSub) {
      this.updateLanguageSub.unsubscribe();
    }
  }
}