import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { BlogService } from './blog.service';
import { Subject, Subscription } from 'rxjs';
import { GlobalService } from '../shared/global.service';
import { Params, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import('jquery').then((jquery) => {
       window.$ = jquery.default;
});
import('popper.js').then(() => {});
import('bootstrap').then(() => {});

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

  // Banner posts variables
  postIndexes: number[] = [0, 1, 2];
  bannerPosts: Post[] = [];
  currentPost: Post;
  showingIndex: number = 0;
  carousel: any;
  nextPost = new Subject();
  postImageSize: string;

  // Subscriptions
  breakpointSub: Subscription;

  constructor(private globalService: GlobalService, private blogService: BlogService, private activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    // Global variables initialization
    this.country = this.globalService.getCountry();
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['blog'];
    //Banner posts variables initialization
    this.postIndexes.forEach(postIndex => {
      this.bannerPosts.push(this.blogService.getPostById(postIndex));
    })
    this.currentPost = this.bannerPosts.slice(0, 1)[0];
    this.nextPost.subscribe((post: Post) => {
      this.currentPost = post;
    });

    //Params subscription for updating language
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        // Update language and translation words
        this.language = params.language;
        this.translationWords = this.globalService.getTranslationLanguage();
        this.componentWords = this.translationWords['blog'];
        this.globalService.updateSubComponentLanguage.next(this.componentWords);
      });

    // Set product responsive images depending on viewport size
    this.breakpointSub = this.createBreakpointsSubscription();
  }

  ngAfterViewInit() {
    //Initialize carousel
    this.carousel = (<any>$('.carousel')).carousel({
      interval: 4000,
      pause: "hover",
      touch: true
    }).carousel('cycle');
    //Update banner post on carousel slid event
    this.carousel.on('slid.bs.carousel', (e: { direction: string; to: number; }) => {
      this.showingIndex = e.to;
      let currentPost = this.bannerPosts.slice(this.showingIndex, this.showingIndex + 1)[0];
      this.nextPost.next(currentPost);
    })

    // Set product responsive images depending on viewport size
    this.breakpointSub = this.createBreakpointsSubscription();
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

  createBreakpointsSubscription() {
    // Set product image url and update the change
    return this.breakpointObserver
      .observe(['(max-width: 450px)', '(max-width: 790px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 450px)']) {
          this.postImageSize = '-small';
        }
        else if (state.breakpoints['(max-width: 790px)']) {
          this.postImageSize = '-medium';
        }
        else {
          this.postImageSize = '-large';
        }
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}
