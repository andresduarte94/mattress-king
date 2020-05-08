import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { BlogService } from './blog.service';
import { Subscription } from 'rxjs';
import { GlobalService } from '../shared/global.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']

})
export class BlogComponent implements OnInit {
  // Global variables
  country: string;
  language: string;
  translationWords: any;
  componentWords: any;
  // Posts variables
  posts: Post[];
  currentPost: Post;
  currentPostSubscription: Subscription;

  constructor(private globalService: GlobalService, private blogService: BlogService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Global variables initialization
    this.country = this.globalService.getCountry();
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['blog'];
    //Params subscription for updating language
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        // Update language and translation words
        this.language = params.language;
        this.translationWords = this.globalService.getTranslationLanguage();
        this.componentWords = this.translationWords['blog'];
        this.globalService.updateSubComponentLanguage.next(this.componentWords);
      });

    this.activatedRoute.queryParams.subscribe(
      () => {
        this.country = this.globalService.getCountry();
      });

    // Posts variables init and current post subscribtion
    this.posts = this.blogService.getPosts();
    this.currentPost = this.posts[0];
    this.currentPostSubscription = this.blogService.carouselPostChanged.subscribe((index: number) => {
      this.currentPost = this.posts[index];
    })
  }

  ngOnDestroy() {
    this.currentPostSubscription.unsubscribe();
  }
}